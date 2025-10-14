import { lazy, Suspense, type FC } from 'react';
import { Flex, Layout, Spin } from 'antd';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@routes';
import { Sidebar } from '@components/Sidebar';

const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage.tsx'));
const CinemasPage = lazy(() => import('./pages/CinemasPage/CinemasPage.tsx'));
const TicketsPage = lazy(() => import('./pages/TicketsPage/TicketsPage.tsx'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage.tsx'));
const MoviePage = lazy(() => import('./pages/MoviePage/MoviePage.tsx'));
const CinemaPage = lazy(() => import('./pages/CinemaPage/CinemaPage.tsx'));
const NotFoundPage = lazy(
  () => import('./pages/NotFoundPage/NotFoundPage.tsx')
);

const { Content } = Layout;

const App: FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Content style={{ padding: '24px' }}>
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
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
