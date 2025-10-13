import { ROUTES } from '../../routes';
import { APP_CONFIG } from '../../config.ts';

export const getMetaConfig = () => ({
  title: 'Кинотеатры - Онлайн-бронирование кинотеатра',
  description:
    'Выберите кинотеатр и просмотрите доступные сеансы для бронирования билетов.',
  ogUrl: `${APP_CONFIG.baseUrl}${ROUTES.CINEMAS.to}`,
});
