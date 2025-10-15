import { useMemo } from 'react';

import type { Movie } from '@generatedApi/models';
import { useGetMovies } from '@generatedApi/movies/movies.ts';

export const useGetAllMovies = () => {
  const { data, ...moviesQueryDetails } = useGetMovies();

  const moviesMap = useMemo(
    () =>
      data?.data.reduce<Record<string, Movie | undefined>>((acc, item) => {
        acc[item.id || ''] = item;
        return acc;
      }, {}) || {},
    [data]
  );

  return {
    movies: data?.data || [],
    moviesMap,
    moviesQueryDetails,
  };
};
