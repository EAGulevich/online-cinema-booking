import { type FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { APP_CONFIG } from '@config';
import { ROUTES } from '@routes';

const CinemasPage: FC = () => {
  useEffect(() => {
    // TODO: для теста удалить
    const getCinemas = async () => {
      fetch(`${APP_CONFIG.apiUrl}/cinemas`)
        .then((data) => data.json())
        .then((data) => {
          console.log({ data });
        });
    };

    getCinemas();
  }, []);

  return (
    <div>
      <title>Кинотеатры - Онлайн-бронирование кинотеатра</title>
      <h1>Кинотеатры</h1>
      <Link to={ROUTES.CINEMA.to('45')}>Test link cinema</Link>
    </div>
  );
};
export default CinemasPage;
