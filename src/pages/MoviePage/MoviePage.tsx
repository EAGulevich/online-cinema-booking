import { useParams } from 'react-router-dom';
import { Typography } from 'antd';
import { MetaTags } from '../../components/MetaTags/MetaTags.tsx';
import { getMetaConfig } from './meta.ts';
import type { FC } from 'react';

const { Title } = Typography;

const MoviePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const name = 'Название фильма';

  return (
    <div>
      <MetaTags config={getMetaConfig(`${id}`, name)} />
      <Title level={2}>Фильм {name}</Title>
      <p>Это страница с подробной информацией о фильме с ID {id}.</p>
    </div>
  );
};

export default MoviePage;
