import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from 'antd';

const { Title } = Typography;

const MoviePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const name = 'Название фильма';

  return (
    <div>
      <title>Фильм {name} - Онлайн-бронирование кинотеатра</title>
      <Title level={2}>Фильм {name}</Title>
      <p>Это страница с подробной информацией о фильме с ID {id}.</p>
    </div>
  );
};

export default MoviePage;
