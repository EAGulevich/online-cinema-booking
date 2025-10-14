import type { Movie } from '@generatedApi/models';

export type MoviesTableDataType = Required<Movie> & { key: string };
