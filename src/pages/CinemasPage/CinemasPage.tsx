import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@routes';

const CinemasPage: FC = () => (
  <div>
    <title>Кинотеатры - Онлайн-бронирование кинотеатра</title>
    <h1>Кинотеатры</h1>
    <Link to={ROUTES.CINEMA.to('45')}>Test link cinema</Link>
  </div>
);

export default CinemasPage;
