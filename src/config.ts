const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const apiUrl = import.meta.env.VITE_APP_API_URL;

if (!baseUrl) {
  throw new Error('VITE_APP_BASE_URL is not defined in .env');
}

if (!apiUrl) {
  throw new Error('VITE_APP_API_URL is not defined in .env');
}

export const APP_CONFIG = {
  baseUrl,
  apiUrl: import.meta.env.PROD ? apiUrl : '/api',
} as const;
