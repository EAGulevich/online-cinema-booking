import { useGetCinemasCinemaIdSessions } from '@generatedApi/cinemas/cinemas.ts';
import { useGetAllCinemas } from '@hooks/useGetAllCinemas.ts';
import { useGetAllMovies } from '@hooks/useGetAllMovies.ts';
import { groupSessions } from '@utils/groupSessions.ts';

type UseCinemaProps = {
  cinemaId: string;
};

export const useCinema = ({ cinemaId }: UseCinemaProps) => {
  const { cinemasMap, cinemasQueryDetails } = useGetAllCinemas();
  const { moviesMap, moviesQueryDetails } = useGetAllMovies();

  const cinemaInfo = cinemasMap[cinemaId || ''];

  const { data, ...queryDetails } = useGetCinemasCinemaIdSessions(+cinemaId);

  const isSessionsLoading =
    cinemasQueryDetails.isLoading ||
    moviesQueryDetails.isLoading ||
    queryDetails.isLoading;

  const sessionsInfo = isSessionsLoading
    ? []
    : groupSessions(data?.data || [], moviesMap, 'movie');

  return {
    cinemaInfo,
    sessionsInfo,
    queryDetails,
  };
};
