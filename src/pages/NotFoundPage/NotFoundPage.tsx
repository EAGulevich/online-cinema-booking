import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';

import { ROUTES } from '@routes';

const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404 - Страница не найдена"
      subTitle="К сожалению, страница, которую вы ищете, не существует."
      extra={
        <Button type="primary" onClick={() => navigate(ROUTES.HOME.to)}>
          Вернуться на главную
        </Button>
      }
    />
  );
};

export default NotFoundPage;
