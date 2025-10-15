import { lazy, Suspense, type FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Flex, Layout, Spin } from 'antd';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';

import { Sidebar } from '@components/Sidebar';
import { ROUTES } from '@routes';

import bgImage from './assets/bg.jpg';
import { theme } from './theme.ts';

const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage.tsx'));
const CinemasPage = lazy(() => import('./pages/CinemasPage/CinemasPage.tsx'));
const TicketsPage = lazy(() => import('./pages/TicketsPage/TicketsPage.tsx'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage.tsx'));
const MoviePage = lazy(() => import('./pages/MoviePage/MoviePage.tsx'));
const BookingPage = lazy(() => import('./pages/BookingPage/BookingPage.tsx'));
const CinemaPage = lazy(() => import('./pages/CinemaPage/CinemaPage.tsx'));
const NotFoundPage = lazy(
  () => import('./pages/NotFoundPage/NotFoundPage.tsx')
);

const { Content } = Layout;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 минута
      gcTime: 1000 * 60 * 5, // 5 минут
      retry: 2,
    },
  },
});

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={theme} locale={ruRU}>
        <Layout
          style={{
            height: '100vh',
            maxHeight: '100vh',
            minWidth: '1024px',
            overflow: 'auto',
          }}
        >
          <Sidebar />
          <Layout>
            <Content
              style={{
                padding: '24px',
                backgroundImage: `linear-gradient(rgb(256 149 0 / 100%), rgb(256 149 0 / 50%), rgb(0 0 0 / 50%)), url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center bottom',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                overflow: 'auto',
              }}
            >
              <Suspense
                fallback={
                  <Flex justify="center" style={{ padding: 50 }}>
                    <Spin size="large" />
                  </Flex>
                }
              >
                <Routes>
                  <Route path={ROUTES.HOME.path} element={<MoviesPage />} />
                  <Route path={ROUTES.MOVIES.path} element={<MoviesPage />} />
                  <Route path={ROUTES.MOVIE.path} element={<MoviePage />} />
                  <Route path={ROUTES.CINEMAS.path} element={<CinemasPage />} />
                  <Route path={ROUTES.CINEMA.path} element={<CinemaPage />} />
                  <Route path={ROUTES.TICKETS.path} element={<TicketsPage />} />
                  <Route path={ROUTES.LOGIN.path} element={<LoginPage />} />
                  <Route path={ROUTES.BOOKING.path} element={<BookingPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
