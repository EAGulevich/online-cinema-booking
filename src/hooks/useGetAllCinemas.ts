import { useMemo } from 'react';

import { useGetCinemas } from '@generatedApi/cinemas/cinemas.ts';
import type { Cinema } from '@generatedApi/models';

export const useGetAllCinemas = () => {
  const { data, ...cinemasQueryDetails } = useGetCinemas();

  const cinemasMap = useMemo(
    () =>
      data?.data.reduce<Record<string, Cinema | undefined>>((acc, item) => {
        acc[item.id || ''] = item;
        return acc;
      }, {}) || {},
    [data]
  );

  return { cinemas: data?.data || [], cinemasMap, cinemasQueryDetails };
};
