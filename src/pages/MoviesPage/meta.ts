import { ROUTES } from '../../routes';
import { APP_CONFIG } from '../../config.ts';

export const getMetaConfig = () => ({
  title: 'Фильмы - Онлайн-бронирование кинотеатра',
  description:
    'Просмотрите список доступных фильмов и забронируйте билеты онлайн быстро и удобно.',
  ogUrl: `${APP_CONFIG.baseUrl}${ROUTES.MOVIES.to}`,
});
