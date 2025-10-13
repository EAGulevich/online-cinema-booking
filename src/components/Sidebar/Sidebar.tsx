import { Layout, Menu } from 'antd';
import type { FC } from 'react';

import { useSidebar } from './useSidebar.tsx';

const { Sider } = Layout;

export const Sidebar: FC = () => {
  const { activeMenuItem, menuItems, onChangeItem } = useSidebar();

  return (
    <Sider theme={'dark'} collapsible>
      <Menu
        theme="dark"
        mode="vertical"
        selectedKeys={[activeMenuItem]}
        items={menuItems}
        onSelect={({ key }) => onChangeItem(key)}
      />
    </Sider>
  );
};
