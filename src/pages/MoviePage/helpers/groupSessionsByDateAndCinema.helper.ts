import dayjs from 'dayjs';

import type { Cinema, MovieSession } from '@generatedApi/models';

import type { GroupedSession } from '../types.ts';

export const groupSessionsByDateAndCinema = (
  sessions: MovieSession[],
  cinemas: Cinema[]
) => {
  const cinemaMap = cinemas.reduce<Record<string, Cinema>>((acc, item) => {
    acc[item.id || ''] = item;
    return acc;
  }, {});

  const groupedByDate = sessions.reduce<Record<string, GroupedSession>>(
    (acc, session) => {
      const date = dayjs(session.startTime).format('DD.MM');
      const time = dayjs(session.startTime).format('HH:mm');

      if (!acc[date]) {
        acc[date] = { date, cinemas: {} };
      }

      const { cinemaId = '' } = session;
      const cinemaName = cinemaMap[cinemaId]?.name || '-';

      if (!acc[date].cinemas[cinemaName]) {
        acc[date].cinemas[cinemaName] = [];
      }

      acc[date].cinemas[cinemaName].push({
        cinemaId: session.cinemaId,
        movieId: session.movieId,
        cinemaName,
        startTime: time,
      });

      return acc;
    },
    {}
  );

  return Object.values(groupedByDate).sort((a, b) =>
    dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1
  );
};
