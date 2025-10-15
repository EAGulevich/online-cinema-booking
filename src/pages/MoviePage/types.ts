import type { Cinema, Movie } from '@generatedApi/models';

export type GroupedSession = {
  date: string;
  cinemas: {
    [key: string]: {
      cinemaId: Cinema['id'];
      movieId: Movie['id'];
      cinemaName: Cinema['name'];
      startTime: string;
    }[];
  };
};
