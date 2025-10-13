import { useParams } from 'react-router-dom';
import { Typography } from 'antd';
import { MetaTags } from '../../components/MetaTags/MetaTags.tsx';
import { getMetaConfig } from './meta.ts';
import type { FC } from 'react';

const { Title } = Typography;

const CinemaPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const name = 'Название кинотеатра';

  return (
    <div>
      <MetaTags config={getMetaConfig(`${id}`, name)} />
      <Title level={2}>Кинотеатр {name}</Title>
      <p>Это страница с информацией о кинотеатре c id {id}.</p>
    </div>
  );
};

export default CinemaPage;
