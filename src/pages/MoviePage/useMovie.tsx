import { useGetCinemas } from '@generatedApi/cinemas/cinemas.ts';
import { useGetMoviesMovieIdSessions } from '@generatedApi/movies/movies.ts';

import { groupSessionsByDateAndCinema } from './helpers/groupSessionsByDateAndCinema.helper.ts';

type UseMovieParams = {
  id?: string;
};
export const useMovie = ({ id }: UseMovieParams) => {
  const { data: cinemaData, ...cinemasQueryDetails } = useGetCinemas();

  console.log({ cinemaData });

  const { data, ...queryDetails } = useGetMoviesMovieIdSessions(+id!, {
    query: {
      enabled: !!id,
    },
  });

  const movieInfo = data?.data.movieData;
  const sessionsInfo =
    cinemasQueryDetails.isLoading || queryDetails.isLoading
      ? []
      : groupSessionsByDateAndCinema(
          data?.data.sessions || [],
          cinemaData?.data || []
        );

  console.log({ sessionsInfo });
  return {
    queryDetails,
    cinemasQueryDetails,
    movieInfo,
    sessionsInfo,
  };
};
