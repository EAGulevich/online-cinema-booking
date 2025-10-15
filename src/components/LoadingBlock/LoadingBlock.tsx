import type { CSSProperties, FC } from 'react';
import { Spin } from 'antd';

const contentStyle: CSSProperties = {
  padding: 50,
  borderRadius: 4,
  height: '200px',
};

const content = <div style={contentStyle} />;

interface LoadingBlockProps {
  tip?: string;
}

export const LoadingBlock: FC<LoadingBlockProps> = ({ tip }) => (
  <Spin tip={tip || 'Загрузка...'} size="large" delay={300}>
    {content}
  </Spin>
);
