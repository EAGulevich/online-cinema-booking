import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetAllMovies } from '@hooks/useGetAllMovies.ts';
import { ROUTES } from '@routes';
import { getAbsoluteUrl } from '@utils/getAbsoluteUrl.ts';

import { getTableColumns } from './getTableColumns.tsx';

import type { MoviesTableDataType } from './types.ts';

export const useMovies = () => {
  const navigation = useNavigate();

  const { movies, moviesQueryDetails } = useGetAllMovies();

  const moviesData = useMemo(
    () =>
      movies.map(
        (movie, idx): MoviesTableDataType => ({
          key: movie.id?.toString() || idx.toString(),
          id: movie.id || 0,
          title: movie.title || '-',
          description: movie.description || '',
          rating: movie.rating || 0,
          year: movie.year || 0,
          lengthMinutes: movie.lengthMinutes || 0,
          posterImage: movie.posterImage
            ? getAbsoluteUrl(movie.posterImage)
            : '',
        })
      ),
    [movies]
  );

  const moviesColumns = useMemo(
    () =>
      getTableColumns({
        onGoToFilm: (movieId) =>
          navigation(ROUTES.MOVIE.to(movieId.toString())),
      }),
    [navigation]
  );

  return {
    moviesData,
    moviesColumns,
    queryDetails: moviesQueryDetails,
  };
};
