import dayjs from 'dayjs';

import { useGetMovieSessionsMovieSessionId } from '@generatedApi/movie-sessions/movie-sessions.ts';
import { useGetAllCinemas } from '@hooks/useGetAllCinemas.ts';
import { useGetAllMovies } from '@hooks/useGetAllMovies.ts';

import type { DescriptionsProps } from 'antd';

type UseCinemaProps = {
  sessionId: string;
};

export const useBooking = ({ sessionId }: UseCinemaProps) => {
  const { cinemasMap, cinemasQueryDetails } = useGetAllCinemas();
  const { moviesMap, moviesQueryDetails } = useGetAllMovies();

  const { data, ...queryDetails } =
    useGetMovieSessionsMovieSessionId(+sessionId);

  const isSessionLoading =
    cinemasQueryDetails.isLoading ||
    moviesQueryDetails.isLoading ||
    queryDetails.isLoading;

  const seats = {
    rows: data?.data.seats?.rows || 0,
    seatsPerRow: data?.data.seats?.seatsPerRow || 0,
  };

  const session = {
    movieTitle: moviesMap[data?.data.movieId || '']?.title,
    cinemaName: cinemasMap[data?.data.cinemaId || '']?.name,
    startTime: data?.data.startTime
      ? dayjs(data?.data.startTime).format('DD.MM, HH:mm')
      : '',
  };

  const sessionInfo: DescriptionsProps['items'] = [
    {
      label: 'Фильм',
      span: 'filled',
      children: session.movieTitle,
    },
    {
      label: 'Кинотеатр',
      span: 'filled',
      children: session.cinemaName,
    },
    {
      label: 'Время',
      span: 'filled',
      children: session.startTime,
    },
  ];

  return {
    isSessionLoading,
    seats,
    sessionInfo,
    queryDetails,
    cinemasQueryDetails,
    moviesQueryDetails,
  };
};
