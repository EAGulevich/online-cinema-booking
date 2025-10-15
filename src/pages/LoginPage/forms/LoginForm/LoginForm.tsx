import { useNavigate } from 'react-router-dom';
import { Button, Flex, Form, type FormProps, Input, notification } from 'antd';

import { usePostLogin } from '@generatedApi/login/login.ts';
import { useSettings } from '@providers/SettingsProvider';
import { ROUTES } from '@routes';
import { getErrorMessage } from '@utils/getErrorMessage.ts';

type FieldType = {
  username?: string;
  password?: string;
};

export const LoginForm = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const { onLogin } = useSettings();

  const { mutate } = usePostLogin({
    mutation: {
      onError: (err) => {
        api.error({
          message: 'Проверьте введенные данные и попробуйте снова',
          description: getErrorMessage(err),
        });
      },
      onSuccess: (data) => {
        onLogin(data.data.token || '');
        navigate(ROUTES.TICKETS.to);
      },
    },
  });

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    mutate({
      data: {
        username: values.username || '',
        password: values.password || '',
      },
    });
  };
  return (
    <>
      {contextHolder}
      <Form
        layout={'vertical'}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Flex gap={'middle'} vertical>
          <div>
            <Form.Item<FieldType>
              label="Логин"
              name="username"
              rules={[{ required: true, message: 'Введите логин' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Пароль"
              name="password"
              rules={[{ required: true, message: 'Введите пароль' }]}
            >
              <Input.Password />
            </Form.Item>
          </div>
          <Flex justify={'center'}>
            <Form.Item label={null}>
              <Button size={'large'} type="primary" htmlType="submit">
                Войти
              </Button>
            </Form.Item>
          </Flex>
        </Flex>
      </Form>
    </>
  );
};
