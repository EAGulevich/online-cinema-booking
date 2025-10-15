import { Button, type TableColumnsType } from 'antd';

import type { CinemasTableDataType } from './types.ts';

type GetTableColumnsParams = {
  onGoToCinema: (cinemaId: CinemasTableDataType['id']) => void;
};

export const getTableColumns = ({
  onGoToCinema,
}: GetTableColumnsParams): TableColumnsType<CinemasTableDataType> => {
  return [
    {
      title: 'Кинотеатр',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Адрес',
      key: 'address',
      dataIndex: 'address',
    },
    {
      width: 200,
      align: 'center',
      title: '',
      key: 'view',
      render: (item: CinemasTableDataType) => (
        <Button onClick={() => onGoToCinema(item.id)}>Посмотреть сеансы</Button>
      ),
    },
  ];
};
