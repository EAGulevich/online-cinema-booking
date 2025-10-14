import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@routes';
import {
  CarryOutOutlined,
  EnvironmentOutlined,
  LoginOutlined,
  LogoutOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { type MenuProps } from 'antd';
import { useCallback, useMemo } from 'react';

export const useSidebar = () => {
  const isAuthenticated = false; // TODO
  const navigate = useNavigate();

  const menuItems: MenuProps['items'] = useMemo(() => {
    return [
      {
        key: ROUTES.MOVIES.to,
        link: ROUTES.MOVIES.to,
        icon: <VideoCameraOutlined />,
        label: 'Фильмы',
      },
      {
        key: ROUTES.CINEMAS.to,
        link: ROUTES.CINEMAS.to,
        icon: <EnvironmentOutlined />,
        label: 'Кинотеатры',
      },
      {
        key: ROUTES.TICKETS.to,
        link: ROUTES.TICKETS.to,
        icon: <CarryOutOutlined />,
        label: 'Мои билеты',
      },
      {
        key: ROUTES.LOGIN.to,
        link: ROUTES.LOGIN.to,
        icon: isAuthenticated ? <LogoutOutlined /> : <LoginOutlined />,
        label: isAuthenticated ? 'Выход' : 'Вход',
      },
    ];
  }, [isAuthenticated]);

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
      navigate(path);
    },
    [navigate]
  );

  return {
    activeMenuItem,
    menuItems,
    onChangeItem,
  };
};
