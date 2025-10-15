import type { FC } from 'react';
import { Button, Col, Divider, Flex, Row, Typography } from 'antd';

import type { Cinema, Movie } from '@generatedApi/models';

import type { GroupedSession } from '../../types.ts';

type ScheduleProps = {
  data: GroupedSession[];
  onSelectSession: (sessionInfo: {
    movieId: Movie['id'];
    cinemaId: Cinema['id'];
  }) => void;
};

export const Schedule: FC<ScheduleProps> = ({ data, onSelectSession }) => {
  return data.map((item) => {
    return (
      <Flex key={item.date} vertical>
        <Divider variant="solid" orientation={'left'}>
          {item.date}
        </Divider>
        <Flex vertical gap={'large'}>
          {Object.entries(item.cinemas)?.map(([cinemaName, sessions]) => (
            <Row key={cinemaName} justify={'start'} align={'top'}>
              <Col span={6} offset={1}>
                <Typography.Title level={5}>{cinemaName}</Typography.Title>
              </Col>
              <Col>
                <Flex gap={'large'} wrap>
                  {sessions.map((session) => (
                    <Button
                      onClick={onSelectSession.bind(null, {
                        movieId: session.movieId,
                        cinemaId: session.cinemaId,
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
  });
};
