import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { createCinemasQueryOptions } from '@queryOptions/createCinemasQueryOptions.ts';
import { ROUTES } from '@routes';

import { useGetCinemas } from '../../generated/кинотеатры/кинотеатры.ts';

const CinemasPage: FC = () => {
  const { data, isLoading } = useQuery(createCinemasQueryOptions());
  const { data: cinemas, isLoading: isLoadingCinemas } = useGetCinemas();

  console.log({ data, isLoading });
  console.log({ cinemas, isLoadingCinemas });

  return (
    <div>
      <title>Кинотеатры - Онлайн-бронирование кинотеатра</title>
      <h1>Кинотеатры</h1>
      <Link to={ROUTES.CINEMA.to('45')}>Test link cinema</Link>
      {cinemas?.data?.map((item) => (
        <div>{item.name}</div>
      ))}
    </div>
  );
};
export default CinemasPage;
