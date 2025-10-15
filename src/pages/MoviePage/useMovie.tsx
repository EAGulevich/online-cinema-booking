import { useGetMoviesMovieIdSessions } from '@generatedApi/movies/movies.ts';
import { useGetAllCinemas } from '@hooks/useGetAllCinemas.ts';
import { useGetAllMovies } from '@hooks/useGetAllMovies.ts';
import { groupSessions } from '@utils/groupSessions.ts';

type UseMovieParams = {
  movieId?: string;
};
export const useMovie = ({ movieId }: UseMovieParams) => {
  const { cinemasMap, cinemasQueryDetails } = useGetAllCinemas();
  const { moviesMap, moviesQueryDetails } = useGetAllMovies();

  const { data, ...queryDetails } = useGetMoviesMovieIdSessions(+movieId!, {
    query: {
      enabled: !!movieId,
    },
  });

  const movieInfo = moviesMap[movieId || ''];

  const sessionsInfo =
    moviesQueryDetails.isLoading ||
    cinemasQueryDetails.isLoading ||
    queryDetails.isLoading
      ? []
      : groupSessions(data?.data || [], cinemasMap, 'cinema');

  return {
    queryDetails,
    cinemasQueryDetails,
    movieInfo,
    sessionsInfo,
  };
};
