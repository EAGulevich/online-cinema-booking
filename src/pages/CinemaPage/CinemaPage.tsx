import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from 'antd';

const { Title } = Typography;

const CinemaPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const name = 'Название кинотеатра';

  return (
    <div>
      <title>Кинотеатр {name} - Онлайн-бронирование кинотеатра</title>
      <Title level={2}>Кинотеатр {name}</Title>
      <p>Это страница с информацией о кинотеатре c id {id}.</p>
    </div>
  );
};

export default CinemaPage;
