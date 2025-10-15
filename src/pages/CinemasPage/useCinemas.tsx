import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetAllCinemas } from '@hooks/useGetAllCinemas.ts';
import { ROUTES } from '@routes';

import { getTableColumns } from './getTableColumns.tsx';

import type { CinemasTableDataType } from './types.ts';

export const useCinemas = () => {
  const navigation = useNavigate();

  const { cinemas, cinemasQueryDetails } = useGetAllCinemas();

  const cinemasData = useMemo(
    () =>
      cinemas.map(
        (cinema, idx): CinemasTableDataType => ({
          key: cinema.id?.toString() || idx.toString(),
          id: cinema.id || 0,
          name: cinema.name || '-',
          address: cinema.address || '-',
        })
      ) || [],
    [cinemas]
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
    queryDetails: cinemasQueryDetails,
  };
};
