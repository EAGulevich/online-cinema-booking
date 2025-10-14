import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, type TableColumnsType } from 'antd';

import { APP_CONFIG } from '@config';
import type { Movie } from '@generatedApi/models';
import { useGetMovies } from '@generatedApi/movies/movies.ts';
import { ROUTES } from '@routes';

interface DataType {
  key: React.Key;
  id: Movie['id'];
  posterImage: Movie['posterImage'];
  title: Movie['title'];
  lengthMinutes: Movie['lengthMinutes'];
  rating: Movie['rating'];
}

const MoviesPage: FC = () => {
  const { data } = useGetMovies();
  const navigation = useNavigate();

  const columns: TableColumnsType<DataType> = [
    {
      title: ' ',
      dataIndex: '',
      key: 'x',
      render: (item: DataType) => {
        return (
          <img alt={'описание'} src={APP_CONFIG.apiUrl + item.posterImage} />
        );
      },
    },
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Продолжительность',
      dataIndex: 'lengthMinutes',
      key: 'lengthMinutes',
    },
    {
      title: 'Рейтинг',
      dataIndex: 'rating',
      key: 'rating',
      defaultSortOrder: 'descend',
      sorter: (a, b) => (a.rating && b.rating ? a.rating - b.rating : 0),
    },
    {
      title: ' ',
      dataIndex: '',
      key: 'x',
      render: (item: DataType) => {
        return (
          <Button
            onClick={() =>
              navigation(ROUTES.MOVIE.to(item.id?.toString() || ''))
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
      <title>Фильмы - Онлайн-бронирование кинотеатра</title>

      <Table<DataType>
        dataSource={data?.data.map<DataType>((item) => ({
          key: item.id?.toString() || '',
          id: item.id || 0,
          title: item.title || '',
          posterImage: item.posterImage || '',
          lengthMinutes: item.lengthMinutes || 0,
          rating: item.rating || 0,
        }))}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default MoviesPage;
