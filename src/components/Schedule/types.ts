import type { ReactNode } from 'react';

import type { Cinema, Movie } from '@generatedApi/models';

export type ScheduleGroupedSession<T> = {
  date: string;
  fullDate: string;
  rows: {
    key: string;
    renderData: T;
    sessions: {
      id: string;
      cinemaId: Cinema['id'];
      movieId: Movie['id'];
      startTime: string;
    }[];
  }[];
};

export type ScheduleProps<T> = {
  data: ScheduleGroupedSession<T>[];
  renderRowLabel: (data: T) => ReactNode;
  onSelectSession: (sessionInfo: { sessionId: string }) => void;
};
