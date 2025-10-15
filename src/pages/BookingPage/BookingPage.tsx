import type { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Col, Descriptions, Row, Typography } from 'antd';

import { LoadingBlock } from '@components/LoadingBlock';

import SeatGrid from './parts/SeatGrid.tsx';
import { useBooking } from './useBooking.ts';

const { Title } = Typography;

const BookingPage: FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId') || '';
  const {
    sessionInfo,
    seats,
    isSessionLoading,
    onSelectFinish,
    contextHolder,
    bookedSeats,
  } = useBooking({
    sessionId,
  });

  if (isSessionLoading) {
    return (
      <>
        <title>Онлайн-бронирование кинотеатра</title>
        <LoadingBlock tip={'Загружаем информацию о зале'} />
      </>
    );
  }

  return (
    <>
      <title>Онлайн-бронирование кинотеатра</title>
      {contextHolder}
      <Row justify={'center'}>
        <Col>
          <Title level={2}>Выбрать места</Title>
        </Col>
      </Row>
      <Descriptions bordered layout={'horizontal'} items={sessionInfo} />
      <SeatGrid
        {...seats}
        onSelectFinish={onSelectFinish}
        bookedSeats={bookedSeats}
      />
    </>
  );
};

export default BookingPage;
