import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

import { APP_CONFIG } from '@config';

export const customInstance = <T>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const instance = axios.create({
    baseURL: `${APP_CONFIG.apiUrl}`,
  });

  // instance.interceptors.request.use((config) => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  //   return config;
  // });

  return instance(config);
};

export default customInstance;
