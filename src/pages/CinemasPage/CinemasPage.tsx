import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { ROUTES } from '@routes';

import { createCinemasQueryOptions } from '../../queryOptions/createCinemasQueryOptions.ts';

const CinemasPage: FC = () => {
  const { data, isLoading } = useQuery(createCinemasQueryOptions());

  console.log({ data, isLoading });

  return (
    <div>
      <title>Кинотеатры - Онлайн-бронирование кинотеатра</title>
      <h1>Кинотеатры</h1>
      <Link to={ROUTES.CINEMA.to('45')}>Test link cinema</Link>
    </div>
  );
};
export default CinemasPage;
