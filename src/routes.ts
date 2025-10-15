export const ROUTES = {
  HOME: { path: '/', to: '/' },
  MOVIES: { path: '/movies', to: '/movies' },
  MOVIE: {
    path: '/movies/:id',
    to: (id: string) => `/movies/${id}` as const,
  },
  CINEMAS: { path: '/cinemas', to: '/cinemas' },
  CINEMA: {
    path: '/cinemas/:id',
    to: (id: string) => `/cinemas/${id}` as const,
  },
  TICKETS: { path: '/tickets', to: '/tickets' },
  LOGIN: { path: '/login', to: '/login' },
  BOOKING: {
    path: '/booking',
    to: ({ sessionId }: { sessionId: string }) => {
      const params = new URLSearchParams({
        sessionId,
      });
      return `/booking?${params.toString()}` as const;
    },
  },
} as const;
