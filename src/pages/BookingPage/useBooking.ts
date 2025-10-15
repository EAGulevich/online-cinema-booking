import { useNavigate } from 'react-router-dom';
import { type DescriptionsProps, notification } from 'antd';
import dayjs from 'dayjs';

import {
  useGetMovieSessionsMovieSessionId,
  usePostMovieSessionsMovieSessionIdBookings,
} from '@generatedApi/movie-sessions/movie-sessions.ts';
import { useGetAllCinemas } from '@hooks/useGetAllCinemas.ts';
import { useGetAllMovies } from '@hooks/useGetAllMovies.ts';
import { ROUTES } from '@routes';
import { getErrorMessage } from '@utils/getErrorMessage.ts';

import type { SelectedSeat } from './parts/types.ts';

type UseCinemaProps = {
  sessionId: string;
};

export const useBooking = ({ sessionId }: UseCinemaProps) => {
  const { cinemasMap, cinemasQueryDetails } = useGetAllCinemas();
  const { moviesMap, moviesQueryDetails } = useGetAllMovies();
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const { data, ...queryDetails } = useGetMovieSessionsMovieSessionId(
    +sessionId,
    {
      query: {
        staleTime: 0,
      },
    }
  );

  const { mutate: bookingTrigger } = usePostMovieSessionsMovieSessionIdBookings(
    {
      mutation: {
        onSuccess: () => {
          navigate(ROUTES.TICKETS.to);
        },
        onError: (err) => {
          api.error({
            message: 'Не удалось забронировать',
            description: getErrorMessage(err),
          });
        },
      },
    }
  );

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

  const onSelectFinish = ({
    selectedSeats,
  }: {
    selectedSeats: SelectedSeat[];
  }) => {
    bookingTrigger({
      movieSessionId: +sessionId,
      data: {
        seats: selectedSeats.map((seat) => ({
          rowNumber: seat.row,
          seatNumber: seat.seat,
        })),
      },
    });
  };

  const bookedSeats = new Set<string>();

  data?.data.bookedSeats?.forEach((item) => {
    bookedSeats.add(`${item.rowNumber}-${item.seatNumber}`);
  });

  return {
    isSessionLoading,
    seats,
    sessionInfo,
    queryDetails,
    cinemasQueryDetails,
    moviesQueryDetails,
    onSelectFinish,
    contextHolder,
    bookedSeats,
  };
};
