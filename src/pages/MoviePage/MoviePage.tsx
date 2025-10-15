import type { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import {
  Button,
  Col,
  Descriptions,
  type DescriptionsProps,
  Flex,
  Image,
  Row,
  Typography,
} from 'antd';

import { LoadingBlock } from '@components/LoadingBlock';
import NotFoundMessage from '@components/NotFoundMessage/NotFoundMessage.tsx';
import { ROUTES } from '@routes';
import { getAbsoluteUrl } from '@utils/getAbsoluteUrl.ts';

import { Schedule } from './parts/Schedule/Schedule.tsx';
import { useMovie } from './useMovie.tsx';

const { Title } = Typography;

const MoviePage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { movieInfo, queryDetails, sessionsInfo } = useMovie({ id });

  const navigate = useNavigate();

  if (queryDetails.isLoading) {
    return (
      <>
        <title>Онлайн-бронирование кинотеатра</title>
        <LoadingBlock />
      </>
    );
  }

  if (!movieInfo) {
    return (
      <>
        <title>Онлайн-бронирование кинотеатра</title>
        <NotFoundMessage title={'Не нашли этого фильма'} />
      </>
    );
  }

  const items: DescriptionsProps['items'] = [
    {
      label: 'Год',
      children: movieInfo?.year,
    },
    {
      label: 'Продолжительность',
      children: movieInfo?.lengthMinutes,
    },
    {
      label: 'Рейнтинг',
      children: movieInfo?.rating,
    },
  ];

  const title = movieInfo?.title
    ? `${movieInfo.title} - Онлайн-бронирование кинотеатра`
    : 'Онлайн-бронирование кинотеатра';

  return (
    <>
      <title>{title}</title>

      <Button
        type="default"
        shape="circle"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(ROUTES.MOVIES.to)}
      />

      <Row justify={'center'}>
        <Col>
          <Title level={2}>{movieInfo?.title}</Title>
        </Col>
      </Row>
      <Row align={'middle'} gutter={20}>
        <Col>
          <Image
            alt={'Обложка фильма'}
            src={getAbsoluteUrl(movieInfo?.posterImage || '')}
            preview={false}
          />
        </Col>
        <Col span={18}>
          <Flex vertical gap={'large'}>
            <Typography.Text>{movieInfo?.description}</Typography.Text>
            <Descriptions bordered layout={'vertical'} items={items} />
          </Flex>
        </Col>
      </Row>
      <Schedule
        data={sessionsInfo}
        onSelectSession={({ movieId, cinemaId }) =>
          navigate(
            ROUTES.BOOKING.to({
              movieId: movieId?.toString() || '',
              cinemaId: cinemaId?.toString() || '',
            })
          )
        }
      />
    </>
  );
};

export default MoviePage;
