import { MetaTags } from '../../components/MetaTags/MetaTags.tsx';
import { getMetaConfig } from './meta.ts';
import type { FC } from 'react';

const TicketsPage: FC = () => (
  <div>
    <MetaTags config={getMetaConfig()} />
    <h1>Мои билеты</h1>
  </div>
);

export default TicketsPage;
