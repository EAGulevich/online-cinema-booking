import { type FC } from 'react';
import { Table } from 'antd';

import { getTableLocaleEmptyMessage } from '@utils/getTableLocaleEmptyMessage.tsx';

import { useCinemas } from './useCinemas.tsx';

import type { CinemasTableDataType } from './types.ts';

const CinemasPage: FC = () => {
  const { cinemasData, cinemasColumns, queryDetails } = useCinemas();

  return (
    <>
      <title>Кинотеатры - Онлайн-бронирование кинотеатра</title>

      <Table<CinemasTableDataType>
        locale={getTableLocaleEmptyMessage({
          isLoading: queryDetails.isLoading,
          isError: queryDetails.isError,
        })}
        dataSource={cinemasData}
        columns={cinemasColumns}
        pagination={false}
      />
    </>
  );
};
export default CinemasPage;
