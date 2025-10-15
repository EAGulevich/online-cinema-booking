import { type FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import { Button, Col, Image, Row, Typography } from 'antd';

import { LoadingBlock } from '@components/LoadingBlock';
import NotFoundMessage from '@components/NotFoundMessage/NotFoundMessage.tsx';
import { Schedule } from '@components/Schedule';
import { ROUTES } from '@routes';
import { getAbsoluteUrl } from '@utils/getAbsoluteUrl.ts';
import type { ScheduleCinemaRenderDataType } from '@utils/groupSessions.ts';

import { useCinema } from './useCinema.tsx';

const { Title } = Typography;

const CinemaPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { cinemaInfo, sessionsInfo, queryDetails } = useCinema({
    cinemaId: id || '',
  });

  if (queryDetails.isLoading) {
    return (
      <>
        <title>Онлайн-бронирование кинотеатра</title>
        <LoadingBlock />
      </>
    );
  }

  if (!cinemaInfo) {
    return (
      <>
        <title>Онлайн-бронирование кинотеатра</title>
        <NotFoundMessage title={'Не нашли этого кинотеатра'} />
      </>
    );
  }

  const title = cinemaInfo?.name
    ? `${cinemaInfo.name} - Онлайн-бронирование кинотеатра`
    : 'Онлайн-бронирование кинотеатра';

  return (
    <>
      <title>{title}</title>

      <Button
        type="default"
        shape="circle"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(ROUTES.CINEMAS.to)}
      />

      <Row justify={'center'}>
        <Col>
          <Title level={2}>{cinemaInfo.name}</Title>
        </Col>
      </Row>
      <Schedule<ScheduleCinemaRenderDataType>
        renderRowLabel={(renderData) => (
          <Row align={'middle'} gutter={20}>
            <Col>
              <Image
                width={80}
                alt={'Обложка фильма'}
                src={getAbsoluteUrl(renderData.posterImage || '')}
                preview={{
                  mask: <EyeOutlined />,
                }}
              />
            </Col>
            <Col span={12}>
              <Typography.Title level={3}>
                {renderData.movieTitle}
              </Typography.Title>
            </Col>
          </Row>
        )}
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

export default CinemaPage;
