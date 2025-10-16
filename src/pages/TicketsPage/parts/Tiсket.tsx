import { useQueryClient } from '@tanstack/react-query';
import { Button, Card, Col, Flex, Row, Statistic, Typography } from 'antd';
import dayjs from 'dayjs';

import { usePostBookingsBookingIdPayments } from '@generatedApi/bookings/bookings.ts';
import type { Booking } from '@generatedApi/models';
import { useSettings } from '@providers/SettingsProvider';
import { getErrorMessage } from '@utils/getErrorMessage.ts';

import type { NotificationInstance } from 'antd/es/notification/interface';

const { Timer } = Statistic;

export const Ticket = ({
  ticket,
  api,
}: {
  ticket: Booking;
  api: NotificationInstance;
}) => {
  const { bookingPaymentTimeSeconds } = useSettings();
  const queryClient = useQueryClient();

  const { mutate } = usePostBookingsBookingIdPayments({
    mutation: {
      onSuccess: (data) => {
        api.success({
          message: data.data.message,
          description: (
            <Typography.Text>
              Билет на фильм{' '}
              <Typography.Text type={'success'}>
                {ticket.movieTitle}
              </Typography.Text>{' '}
              оплачен. Приятного просмотра!
            </Typography.Text>
          ),
        });
        queryClient.invalidateQueries({ queryKey: ['/me/bookings'] });
      },
      onError: (err) => {
        api.error({
          message: getErrorMessage(err),
        });
      },
    },
  });

  const endTime = dayjs(ticket.bookedAt).add(
    bookingPaymentTimeSeconds,
    'second'
  );
  return (
    <>
      <Card>
        <Row>
          <Col span={6}>
            <Flex vertical>
              <Typography.Text>{ticket.movieTitle}</Typography.Text>
              <Typography.Text>{ticket.cinemaName}</Typography.Text>
              <Typography.Text>
                {dayjs(ticket.startTime).format('DD.MM, HH:mm')}
              </Typography.Text>
            </Flex>
          </Col>
          <Col span={6}>
            <Flex vertical>
              {ticket.seats?.map(({ seatNumber, rowNumber }) => (
                <Typography.Text key={`${rowNumber}-${seatNumber}`}>
                  {`Ряд ${rowNumber}, место ${seatNumber}`}
                </Typography.Text>
              ))}
            </Flex>
          </Col>
          <Col span={6}>
            {!ticket.isPaid && (
              <Button
                onClick={() => {
                  mutate({
                    bookingId: ticket.id?.toString() || '',
                  });
                }}
              >
                Оплатить
              </Button>
            )}
          </Col>
          <Col span={6}>
            {!ticket.isPaid && (
              <Timer
                type="countdown"
                title="Осталось:"
                value={endTime.toISOString()}
                format="m:ss"
                onFinish={() => {
                  api.warning({
                    message: 'Бронирование отменено',
                    description: (
                      <Typography.Text>
                        Время оплаты билета на фильм{' '}
                        <Typography.Text type={'warning'}>
                          {ticket.movieTitle}
                        </Typography.Text>{' '}
                        истекло.
                      </Typography.Text>
                    ),
                  });
                  setTimeout(() => {
                    queryClient.invalidateQueries({
                      queryKey: ['/me/bookings'],
                    });
                  }, 1000);
                }}
              />
            )}
          </Col>
        </Row>
      </Card>
    </>
  );
};
