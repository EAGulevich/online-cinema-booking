import { ROUTES } from '../../routes.ts';
import { Link } from 'react-router-dom';
import { MetaTags } from '../../components/MetaTags/MetaTags.tsx';
import { getMetaConfig } from './meta.ts';
import type { FC } from 'react';

const MoviesPage: FC = () => (
  <div>
    <MetaTags config={getMetaConfig()} />
    <h1>Фильмы</h1>
    <Link to={ROUTES.MOVIE.to('45')}>Test link movie</Link>
  </div>
);

export default MoviesPage;
