import { ROUTES } from '../../routes';
import { APP_CONFIG } from '../../config.ts';

export const getMetaConfig = (id: string, name: string) => ({
  title: `Кинотеатр ${name} - Онлайн-бронирование кинотеатра`,
  description: `Информация о кинотеатре "${name}". Выберите сеансы и бронируйте билеты онлайн.`,
  ogUrl: `${APP_CONFIG.baseUrl}${ROUTES.CINEMA.to(id)}`,
});
