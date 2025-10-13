import { ROUTES } from '../../routes.ts';
import { Link } from 'react-router-dom';
import type { FC } from 'react';

const MoviesPage: FC = () => (
  <div>
    <title>Фильмы - Онлайн-бронирование кинотеатра</title>
    <h1>Фильмы</h1>
    <Link to={ROUTES.MOVIE.to('45')}>Test link movie</Link>
  </div>
);

export default MoviesPage;
