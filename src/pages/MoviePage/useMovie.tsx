import { useGetMoviesMovieIdSessions } from '@generatedApi/movies/movies.ts';
import { useGetAllCinemas } from '@hooks/useGetAllCinemas.ts';

import { groupSessionsByDateAndCinema } from './helpers/groupSessionsByDateAndCinema.helper.ts';

type UseMovieParams = {
  id?: string;
};
export const useMovie = ({ id }: UseMovieParams) => {
  const { cinemasMap, cinemasQueryDetails } = useGetAllCinemas();

  const { data, ...queryDetails } = useGetMoviesMovieIdSessions(+id!, {
    query: {
      enabled: !!id,
    },
  });

  const movieInfo = data?.data.movieData;
  const sessionsInfo =
    cinemasQueryDetails.isLoading || queryDetails.isLoading
      ? []
      : groupSessionsByDateAndCinema(data?.data.sessions || [], cinemasMap);

  return {
    queryDetails,
    cinemasQueryDetails,
    movieInfo,
    sessionsInfo,
  };
};
