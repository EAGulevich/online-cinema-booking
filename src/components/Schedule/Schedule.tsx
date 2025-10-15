import type { ReactNode } from 'react';
import { Button, Col, Divider, Flex, Row, Typography } from 'antd';

import type { Cinema, Movie } from '@generatedApi/models';

export type ScheduleGroupedSession<T> = {
  date: string;
  rows: {
    key: string;
    renderData: T;
    sessions: {
      id: string;
      cinemaId: Cinema['id'];
      movieId: Movie['id'];
      startTime: string;
    }[];
  }[];
};

export type ScheduleProps<T> = {
  data: ScheduleGroupedSession<T>[];
  renderRowLabel: (data: T) => ReactNode;
  onSelectSession: (sessionInfo: { sessionId: string }) => void;
};

export const Schedule = <T,>({
  data,
  onSelectSession,
  renderRowLabel,
}: ScheduleProps<T>) => {
  return (
    <>
      <Divider />
      <Typography.Title level={2}>Расписание</Typography.Title>
      {data.map((item) => {
        return (
          <Flex key={item.date} vertical>
            <Divider variant="solid" orientation={'left'}>
              {item.date}
            </Divider>
            <Flex vertical gap={'large'}>
              {item.rows.map((row) => (
                <Row key={row.key} justify={'start'} align={'top'} gutter={20}>
                  <Col span={10} offset={1}>
                    {renderRowLabel(row.renderData)}
                  </Col>
                  <Col span={10}>
                    <Flex gap={'large'} wrap>
                      {row.sessions.map((session) => (
                        <Button
                          onClick={onSelectSession.bind(null, {
                            sessionId: session.id,
                          })}
                        >
                          {session.startTime}
                        </Button>
                      ))}
                    </Flex>
                  </Col>
                </Row>
              ))}
            </Flex>
          </Flex>
        );
      })}
    </>
  );
};
