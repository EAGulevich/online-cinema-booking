import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@routes';
import type { FC } from 'react';

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
