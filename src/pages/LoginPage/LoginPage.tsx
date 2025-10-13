import { MetaTags } from '../../components/MetaTags/MetaTags.tsx';
import { getMetaConfig } from './mets.ts';
import type { FC } from 'react';

const LoginPage: FC = () => (
  <div>
    <MetaTags config={getMetaConfig()} />
    <h1>Войти / Зарегистрироваться</h1>
  </div>
);

export default LoginPage;
