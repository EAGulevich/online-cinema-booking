import { createQueryOptions } from './createQueryOptions.ts';

export function createCinemasQueryOptions() {
  return createQueryOptions<{ name: string }[]>({
    key: ['cinemas'],
    endpoint: '/cinemas',
  });
}
