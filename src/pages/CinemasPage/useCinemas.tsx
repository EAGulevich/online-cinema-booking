import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetCinemas } from '@generatedApi/cinemas/cinemas.ts';
import { ROUTES } from '@routes';

import { getTableColumns } from './getTableColumns.tsx';

import type { CinemasTableDataType } from './types.ts';

export const useCinemas = () => {
  const navigation = useNavigate();

  const { data, ...queryDetails } = useGetCinemas();

  const cinemasData = useMemo(
    () =>
      data?.data.map(
        (cinema, idx): CinemasTableDataType => ({
          key: cinema.id?.toString() || idx.toString(),
          id: cinema.id || 0,
          name: cinema.name || '-',
          address: cinema.address || '-',
        })
      ) || [],
    [data]
  );

  const cinemasColumns = useMemo(
    () =>
      getTableColumns({
        onGoToCinema: (cinemaId) =>
          navigation(ROUTES.CINEMA.to(cinemaId.toString())),
      }),
    [navigation]
  );

  return {
    cinemasData,
    cinemasColumns,
    queryDetails,
  };
};
