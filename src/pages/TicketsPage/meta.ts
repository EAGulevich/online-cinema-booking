import { ROUTES } from '../../routes';
import { APP_CONFIG } from '../../config.ts';

export const getMetaConfig = () => ({
  title: 'Мои билеты - Онлайн-бронирование кинотеатра',
  description: 'Просмотрите и управляйте своими забронированными билетами.',
  ogUrl: `${APP_CONFIG.baseUrl}${ROUTES.TICKETS.to}`,
});
