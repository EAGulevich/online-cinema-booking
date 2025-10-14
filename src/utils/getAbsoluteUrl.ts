import { APP_CONFIG } from '@config';

export const getAbsoluteUrl = (relativePath: string) =>
  APP_CONFIG.apiUrl + relativePath;
