import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, type TableColumnsType } from 'antd';

import { useGetCinemas } from '@generatedApi/cinemas/cinemas.ts';
import type { Cinema } from '@generatedApi/models';
import { ROUTES } from '@routes';

interface DataType {
  key: React.Key;
  id: Cinema['id'];
  name: Cinema['name'];
  address: Cinema['address'];
}

const CinemasPage: FC = () => {
  const { data } = useGetCinemas();
  const navigation = useNavigate();

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Кинотеатр',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Андрес',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: ' ',
      dataIndex: '',
      key: 'x',
      render: (item: DataType) => {
        return (
          <Button
            onClick={() =>
              navigation(ROUTES.CINEMA.to(item.id?.toString() || ''))
            }
          >
            Посмотреть сеансы
          </Button>
        );
      },
    },
  ];
  return (
    <div>
      <title>Кинотеатры - Онлайн-бронирование кинотеатра</title>

      <Table<DataType>
        dataSource={data?.data.map<DataType>((item) => ({
          key: item.id?.toString() || '',
          id: item.id || 0,
          name: item.name || '',
          address: item.address || '',
        }))}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};
export default CinemasPage;
