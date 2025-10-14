import type { FC } from 'react';
import { Table } from 'antd';

import { getTableLocaleEmptyMessage } from '@utils/getTableLocaleEmptyMessage.tsx';

import { useMovies } from './useMovies.tsx';

import type { MoviesTableDataType } from './types.ts';

const MoviesPage: FC = () => {
  const { moviesData, moviesColumns, queryDetails } = useMovies();

  return (
    <>
      <title>Фильмы - Онлайн-бронирование кинотеатра</title>

      <Table<MoviesTableDataType>
        locale={getTableLocaleEmptyMessage({
          isLoading: queryDetails.isLoading,
          isError: queryDetails.isError,
        })}
        dataSource={moviesData}
        columns={moviesColumns}
        pagination={false}
      />
    </>
  );
};

export default MoviesPage;
