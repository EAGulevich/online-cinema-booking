import { ROUTES } from '../../routes';
import { APP_CONFIG } from '../../config.ts';

export const getMetaConfig = (id: string, name: string) => ({
  title: `Фильм "${name}" - Онлайн-бронирование кинотеатра`,
  description: `Подробная информация о фильме "${name}".`,
  ogUrl: `${APP_CONFIG.baseUrl}${ROUTES.MOVIE.to(id)}`,
});
