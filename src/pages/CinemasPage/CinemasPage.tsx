import { ROUTES } from '../../routes.ts';
import { Link } from 'react-router-dom';
import { MetaTags } from '../../components/MetaTags/MetaTags.tsx';
import { getMetaConfig } from './meta.ts';
import type { FC } from 'react';

const CinemasPage: FC = () => (
  <div>
    <MetaTags config={getMetaConfig()} />
    <h1>Кинотеатры</h1>
    <Link to={ROUTES.CINEMA.to('45')}>Test link cinema</Link>
  </div>
);

export default CinemasPage;
