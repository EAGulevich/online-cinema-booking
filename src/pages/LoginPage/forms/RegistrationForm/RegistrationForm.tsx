import { useNavigate } from 'react-router-dom';
import { Button, Flex, Form, type FormProps, Input, notification } from 'antd';

import { usePostRegister } from '@generatedApi/register/register.ts';
import { useSettings } from '@providers/SettingsProvider';
import { ROUTES } from '@routes';
import { getErrorMessage } from '@utils/getErrorMessage.ts';

import { isValidPassword } from './helpers/isValidPassord.ts';
import { isValidUsername } from './helpers/isValidUsername.ts';

type FieldType = {
  username?: string;
  password?: string;
  confirm?: string;
};

export const RegistrationForm = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const { onLogin } = useSettings();

  const { mutate } = usePostRegister({
    mutation: {
      onError: (err) => {
        api.error({
          message: 'Не удалось выполнить регистрацию',
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
              rules={[
                { required: true, message: 'Введите логин' },
                () => ({
                  validator(_, value) {
                    if (!value || isValidUsername(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Логин должен быть длиной от 8 символов')
                    );
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Пароль"
              name="password"
              rules={[
                { required: true, message: 'Введите пароль' },
                () => ({
                  validator(_, value) {
                    if (!value || isValidPassword(value)) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        'Пароль должен быть длиной от 8 символов, иметь минимум 1 заглавную букву и 1 цифру'
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Подтверждение пароля"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста подтвердите пароль',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Пароли не совпадают'));
                  },
                }),
              ]}
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
