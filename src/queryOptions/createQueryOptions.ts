import { type QueryOptions, queryOptions } from '@tanstack/react-query';

import { APP_CONFIG } from '@config';

interface CreateQueryOptionsParams<T>
  extends Omit<QueryOptions<T>, 'queryKey' | 'queryFn'> {
  key: string[];
  endpoint: string;
  headers?: Record<string, string>;
}

export function createQueryOptions<T>({
  key,
  endpoint,
  headers = {},
  ...options
}: CreateQueryOptionsParams<T>) {
  return queryOptions({
    queryKey: key,
    queryFn: async (): Promise<T> => {
      const response = await fetch(`${APP_CONFIG.apiUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
    ...options,
  });
}


