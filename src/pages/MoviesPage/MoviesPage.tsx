import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@routes';

const MoviesPage: FC = () => (
  <div>
    <title>Фильмы - Онлайн-бронирование кинотеатра</title>
    <h1>Фильмы</h1>
    <Link to={ROUTES.MOVIE.to('45')}>Test link movie</Link>
  </div>
);

export default MoviesPage;
