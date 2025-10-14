import { theme as antdTheme, type ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  algorithm: antdTheme.darkAlgorithm,
  token: {
    colorPrimary: '#ff9500',
    colorBgLayout: '#fff9e6', // Общий фон layout
  },
  components: {
    // Настройки для Sider
    Layout: {
      bodyBg: '#fff9e6', // Фон основного контента
      colorBgContainer: '#fff3cd', // Фон контейнеров
      siderBg: '#141414', // Фон Sider (основной цвет)
      triggerBg: '#000000',
    },
    // Настройки для Menu
    Menu: {
      darkItemBg: 'transparent', // Фон пунктов меню
      itemSelectedBg: '#ffeb3b', // Фон выбранного пункта
      itemHoverBg: '#ffcc80', // Фон при наведении
      itemColor: '#5a3d00', // Цвет текста
      itemHoverColor: '#d35400', // Цвет текста при наведении
      itemSelectedColor: '#d35400', // Цвет выбранного текста
      colorBgContainer: 'transparent', // Фон всего меню
    },
  },
};
