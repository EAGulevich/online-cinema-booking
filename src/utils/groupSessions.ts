import dayjs from 'dayjs';

import type {
  ScheduleGroupedSession,
  ScheduleProps,
} from '@components/Schedule/types.ts';
import type { Cinema, Movie, MovieSession } from '@generatedApi/models';

export type ScheduleCinemaRenderDataType = {
  movieTitle: string;
  posterImage: string;
};

export type ScheduleMovieRenderDataType = {
  cinemaName: string;
};

type GroupedMap<RenderDataType> = {
  [date: string]: {
    date: string;
    fullDate: string;
    rows: {
      [rowKey: string]: {
        key: string;
        renderData: RenderDataType;
        sessions: {
          id: string;
          cinemaId: Cinema['id'];
          movieId: Movie['id'];
          startTime: string;
        }[];
      };
    };
  };
};

export const groupSessions = <
  GroupType extends 'movie' | 'cinema',
  DataMap extends
    | Record<string, Movie | undefined>
    | Record<string, Cinema | undefined> = GroupType extends 'movie'
    ? Record<string, Movie | undefined>
    : Record<string, Cinema | undefined>,
  RenderDataType extends
    | ScheduleCinemaRenderDataType
    | ScheduleMovieRenderDataType = GroupType extends 'movie'
    ? ScheduleCinemaRenderDataType
    : ScheduleMovieRenderDataType,
>(
  sessions: MovieSession[],
  dataMap: DataMap,
  groupBy: GroupType
): ScheduleProps<RenderDataType>['data'] => {
  const groupedByDateAndKey = sessions.reduce<GroupedMap<RenderDataType>>(
    (acc, session) => {
      const date = dayjs(session.startTime).format('DD.MM');
      const time = dayjs(session.startTime).format('HH:mm');
      const dateKey = date;
      const dateRowKey = date + '-' + session.cinemaId + '-' + session.movieId;

      if (!acc[dateKey]) {
        acc[dateKey] = { date, fullDate: session.startTime || '', rows: {} };
      }

      if (!acc[date].rows[dateRowKey]) {
        acc[date].rows[dateRowKey] = {
          key: dateRowKey,
          renderData:
            groupBy === 'movie'
              ? ({
                  movieTitle:
                    (dataMap as Record<string, Movie | undefined>)[
                      session.movieId?.toString() || ''
                    ]?.title || '',
                  posterImage:
                    (dataMap as Record<string, Movie | undefined>)[
                      session.movieId?.toString() || ''
                    ]?.posterImage || '',
                } as RenderDataType)
              : ({
                  cinemaName:
                    (dataMap as Record<string, Cinema | undefined>)[
                      session.cinemaId?.toString() || ''
                    ]?.name || '-',
                } as RenderDataType),
          sessions: [],
        };
      }

      acc[date].rows[dateRowKey].sessions.push({
        id: session.id?.toString() || '',
        cinemaId: session.cinemaId,
        movieId: session.movieId,
        startTime: time,
      });

      return acc;
    },
    {}
  );

  return Object.values(groupedByDateAndKey)
    .map(
      (val): ScheduleGroupedSession<RenderDataType> => ({
        ...val,
        rows: Object.values(val.rows),
      })
    )
    .sort((a, b) => (dayjs(a.fullDate).isBefore(dayjs(b.fullDate)) ? -1 : 1));
};
