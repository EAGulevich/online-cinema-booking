import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';

import { ROUTES } from '@routes';

interface NotFoundMessageProps {
  title?: string;
  subTitle?: string;
}

const NotFoundMessage: FC<NotFoundMessageProps> = ({ subTitle, title }) => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title={title || '404 - Страница не найдена'}
      subTitle={
        subTitle || 'К сожалению, страница, которую вы ищете, не существует.'
      }
      extra={
        <Button type="primary" onClick={() => navigate(ROUTES.HOME.to)}>
          Вернуться на главную
        </Button>
      }
    />
  );
};

export default NotFoundMessage;
