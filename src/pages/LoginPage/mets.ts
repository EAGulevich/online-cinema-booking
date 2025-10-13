import { ROUTES } from '../../routes';
import { APP_CONFIG } from '../../config.ts';

export const getMetaConfig = () => ({
  title: 'Вход - Онлайн-бронирование кинотеатра',
  description:
    'Войдите в свой аккаунт или зарегистрируйтесь, чтобы бронировать билеты и просматривать свои заказы.',
  ogUrl: `${APP_CONFIG.baseUrl}${ROUTES.LOGIN.to}`,
});
