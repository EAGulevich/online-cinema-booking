import type { CSSProperties } from 'react';
import {
  InboxOutlined,
  LoadingOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Flex, Typography } from 'antd';

import type { TableLocale } from 'antd/es/table/interface';

const iconsStyle: CSSProperties = {
  fontSize: 30,
};

export const getTableLocaleEmptyMessage = ({
  isError,
  isLoading,
}: {
  isError: boolean;
  isLoading: boolean;
}): TableLocale => {
  const text = isLoading
    ? 'Загружаем данные'
    : isError
      ? 'Не удалось загрузить данные'
      : 'Здесь пока пусто';
  const icon = isLoading ? (
    <LoadingOutlined style={iconsStyle} />
  ) : isError ? (
    <WarningOutlined style={iconsStyle} />
  ) : (
    <InboxOutlined style={iconsStyle} />
  );

  return {
    emptyText: (
      <Flex gap={'middle'} justify="center" align="center">
        {icon}
        <Typography.Text>{text}</Typography.Text>
      </Flex>
    ),
  };
};
