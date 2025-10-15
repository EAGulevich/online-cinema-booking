import EyeOutlined from '@ant-design/icons/EyeOutlined';
import { Button, Image, type TableColumnsType, Tag, Typography } from 'antd';

import { formatMinutesToHHmm } from '@utils/formatMinutesToHHmm.ts';

import type { MoviesTableDataType } from './types.ts';

type GetTableColumnsParams = {
  onGoToFilm: (movieId: MoviesTableDataType['id']) => void;
};

export const getTableColumns = ({
  onGoToFilm,
}: GetTableColumnsParams): TableColumnsType<MoviesTableDataType> => {
  return [
    {
      width: 100,
      title: '',
      key: 'posterImage',
      render: (item: MoviesTableDataType) => (
        <Image
          placeholder={true}
          preview={{
            mask: <EyeOutlined />,
          }}
          height={100}
          alt={`Обложка фильма ${item.title}`}
          src={item.posterImage}
        />
      ),
    },
    {
      title: 'Название',
      key: 'title',
      render: (item: MoviesTableDataType) => (
        <Typography.Text strong style={{ fontSize: 18 }}>
          {item.title}
        </Typography.Text>
      ),
    },
    {
      title: 'Продолжительность',
      key: 'lengthMinutes',
      align: 'center',
      render: (item: MoviesTableDataType) =>
        formatMinutesToHHmm(item.lengthMinutes),
    },
    {
      align: 'center',
      title: 'Рейтинг',
      key: 'rating',
      defaultSortOrder: 'descend',
      sorter: (a, b) => (a.rating && b.rating ? a.rating - b.rating : 0),
      render: (item: MoviesTableDataType) => (
        <Tag color={item.rating > 9 ? 'gold' : undefined}>{item.rating}</Tag>
      ),
    },
    {
      width: 200,
      align: 'center',
      title: '',
      key: 'view',
      render: (item: MoviesTableDataType) => (
        <Button onClick={() => onGoToFilm(item.id)}>Посмотреть сеансы</Button>
      ),
    },
  ];
};
