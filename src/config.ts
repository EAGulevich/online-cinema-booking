const baseUrl = import.meta.env.VITE_APP_BASE_URL;

if (!baseUrl) {
  throw new Error('VITE_APP_BASE_URL is not defined in .env');
}

export const APP_CONFIG = {
  baseUrl,
};
