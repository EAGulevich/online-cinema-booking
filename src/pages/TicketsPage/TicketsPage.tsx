import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Flex,
  notification,
  Result,
  Row,
  Typography,
} from 'antd';

import { LoadingBlock } from '@components/LoadingBlock';
import { ROUTES } from '@routes';

import { Ticket } from './parts/Tiсket.tsx';
import { useTickets } from './useTickets.ts';

const TicketsPage: FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();
  const { groupedBooking, isLoading } = useTickets();
  const isEmpty =
    !groupedBooking.unpaid.length &&
    !groupedBooking.past.length &&
    !groupedBooking.future.length;

  return (
    <>
      {contextHolder}
      <title>Мои билеты - Онлайн-бронирование кинотеатра</title>

      <Row justify={'center'}>
        <Col>
          <Typography.Title level={2}>Мои билеты</Typography.Title>
        </Col>
      </Row>
      {isLoading && <LoadingBlock />}
      {!isLoading && isEmpty && (
        <Result
          icon={<SmileOutlined style={{ color: '#fef1dd' }} />}
          title="У вас пока нет билетов"
          subTitle="Выбирайте фильм и бронируйте места"
          extra={
            <Button
              type="primary"
              onClick={() => {
                navigate(ROUTES.MOVIES.to);
              }}
            >
              К фильмам
            </Button>
          }
        />
      )}
      {!!groupedBooking.unpaid.length && <Divider>Неоплаченные</Divider>}
      <Flex vertical gap={'large'}>
        {groupedBooking.unpaid.map((i) => {
          return <Ticket key={i.id} ticket={i} api={api} />;
        })}
      </Flex>
      {!!groupedBooking.future.length && <Divider>Будущие</Divider>}
      <Flex vertical gap={'large'}>
        {groupedBooking.future.map((i) => {
          return <Ticket key={i.id} ticket={i} api={api} />;
        })}
      </Flex>
      {!!groupedBooking.past.length && <Divider>Прошедшие</Divider>}
      <Flex vertical gap={'large'}>
        {groupedBooking.past.map((i) => {
          return <Ticket key={i.id} ticket={i} api={api} />;
        })}
      </Flex>
    </>
  );
};

export default TicketsPage;
