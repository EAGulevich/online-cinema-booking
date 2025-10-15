import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CarryOutOutlined from '@ant-design/icons/CarryOutOutlined';
import EnvironmentOutlined from '@ant-design/icons/EnvironmentOutlined';
import LoginOutlined from '@ant-design/icons/LoginOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import VideoCameraOutlined from '@ant-design/icons/VideoCameraOutlined';
import { type MenuProps } from 'antd';

import { useSettings } from '@providers/SettingsProvider';
import { ROUTES } from '@routes';

export const useSidebar = () => {
  const navigate = useNavigate();
  const { token, onLogout } = useSettings();
  const isAuthorized = !!token;

  const menuItems: MenuProps['items'] = useMemo(() => {
    return [
      {
        key: ROUTES.MOVIES.to,
        icon: <VideoCameraOutlined />,
        label: 'Фильмы',
      },
      {
        key: ROUTES.CINEMAS.to,
        icon: <EnvironmentOutlined />,
        label: 'Кинотеатры',
      },
      {
        key: ROUTES.TICKETS.to,
        icon: <CarryOutOutlined />,
        label: 'Мои билеты',
      },
      {
        key: ROUTES.LOGIN.to,
        icon: isAuthorized ? <LogoutOutlined /> : <LoginOutlined />,
        label: isAuthorized ? 'Выход' : 'Вход',
      },
    ];
  }, [isAuthorized]);

  const { pathname } = useLocation();
  const firstPathname = pathname.split('/')[1] || '';

  let activeMenuItem = '';

  switch (firstPathname) {
    case '':
    case '/':
    case 'movies':
      activeMenuItem = ROUTES.MOVIES.to;
      break;
    case 'cinemas':
      activeMenuItem = ROUTES.CINEMAS.to;
      break;
    case 'tickets':
      activeMenuItem = ROUTES.TICKETS.to;
      break;
    case 'login':
      activeMenuItem = ROUTES.LOGIN.to;
      break;
    default:
      activeMenuItem = '';
      break;
  }

  const onChangeItem = useCallback(
    (path: string) => {
      // ТЗ: при logout переходить на страницу с фильмами
      // ТЗ: при попытке перейти в "Мои билеты" без токена переходить на страницу авторизации

      if (isAuthorized && path === ROUTES.LOGIN.to) {
        onLogout();
        navigate(ROUTES.MOVIES.to);
      } else if (!isAuthorized && path === ROUTES.TICKETS.to) {
        navigate(ROUTES.LOGIN.to);
      } else {
        navigate(path);
      }
    },
    [isAuthorized, navigate, onLogout]
  );

  return {
    activeMenuItem,
    menuItems,
    onChangeItem,
  };
};
