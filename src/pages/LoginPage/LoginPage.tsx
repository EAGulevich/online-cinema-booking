import { type FC, useState } from 'react';
import { Button, Card, Col, Flex, Row, Typography } from 'antd';

import { LoginForm } from './forms/LoginForm/LoginForm.tsx';
import { RegistrationForm } from './forms/RegistrationForm/RegistrationForm.tsx';

const LoginPage: FC = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <>
      <title>Вход - Онлайн-бронирование кинотеатра</title>

      <Row justify={'center'}>
        <Col>
          <Typography.Title level={2}>
            {isLoginForm ? 'Вход' : 'Регистрация'}
          </Typography.Title>
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col>
          <Card style={{ width: 400 }}>
            {isLoginForm ? <LoginForm /> : <RegistrationForm />}
            <Flex justify={'center'}>
              <Typography.Text>
                {isLoginForm
                  ? 'Если у вас нет аккаунта'
                  : 'Если вы уже зарегистрированы'}

                <Button
                  size={'small'}
                  ghost
                  type={'link'}
                  onClick={() => setIsLoginForm(!isLoginForm)}
                >
                  {isLoginForm ? 'зарегистируйтесь' : 'войдите'}
                </Button>
              </Typography.Text>
            </Flex>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
