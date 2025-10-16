import { groupSessions } from './groupSessions.ts';
import { Cinema, Movie, MovieSession } from '@generatedApi/models';

describe('Тестирование groupSessions', () => {
  it('Группировка по фильмам корректна', () => {
    const sessions: MovieSession[] = [
      {
        id: 22,
        movieId: 2,
        cinemaId: 4,
        startTime: '2025-10-16T06:00:00.000Z',
      },
      {
        id: 23,
        movieId: 4,
        cinemaId: 4,
        startTime: '2025-10-16T08:30:00.000Z',
      },
      {
        id: 25,
        movieId: 2,
        cinemaId: 4,
        startTime: '2025-10-16T13:30:00.000Z',
      },
    ];

    const dataMap: Record<string, Movie> = {
      '2': {
        id: 2,
        title: 'Крёстный отец',
        year: 1972,
        rating: 9.2,
        posterImage: '/static/images/posters/godfather.jpg',
        lengthMinutes: 175,
        description: 'Стареющий глава мафиозной династии...',
      },
      '4': {
        id: 4,
        title: 'Крёстный отец 2',
        year: 1974,
        rating: 9.0,
        posterImage: '/static/images/posters/godfather2.jpg',
        lengthMinutes: 202,
        description: 'Показана ранняя жизнь и карьера Вито Корлеоне...',
      },
    };

    const result = groupSessions(sessions, dataMap, 'movie');

    expect(result).toHaveLength(1);
    expect(result[0].date).toBe('16.10');
    expect(result[0].rows).toHaveLength(2);

    const godfatherRow = result[0].rows.find(
      (row) => row.renderData.movieTitle === 'Крёстный отец'
    );
    expect(godfatherRow).toBeDefined();
    expect(godfatherRow?.sessions).toHaveLength(2);
    expect(godfatherRow?.sessions[0]).toEqual({
      id: '22',
      cinemaId: 4,
      movieId: 2,
      startTime: '09:00',
    });

    const godfather2Row = result[0].rows.find(
      (row) => row.renderData.movieTitle === 'Крёстный отец 2'
    );
    expect(godfather2Row).toBeDefined();
    expect(godfather2Row?.sessions).toHaveLength(1);
  });

  it('Группировка по кинотеатрам корректна', () => {
    const sessions: MovieSession[] = [
      { id: 1, movieId: 1, cinemaId: 1, startTime: '2025-10-16T07:00:00.000Z' },
      { id: 4, movieId: 1, cinemaId: 1, startTime: '2025-10-16T10:45:00.000Z' },
      {
        id: 16,
        movieId: 1,
        cinemaId: 3,
        startTime: '2025-10-16T07:15:00.000Z',
      },
    ];

    const dataMap: Record<string, Cinema> = {
      '1': {
        id: 1,
        name: 'Skyline Cinema',
        address: 'ТРЦ Galileo, ул. Бобруйская, 6',
      },
      '3': {
        id: 3,
        name: 'mooon в ТРЦ Palazzo',
        address: 'ТРЦ Palazzo, ул. Тимирязева, 74а, эт. 3',
      },
    };

    const result = groupSessions(sessions, dataMap, 'cinema');

    expect(result).toHaveLength(1);
    expect(result[0].date).toBe('16.10');
    expect(result[0].rows).toHaveLength(2);

    const skylineRow = result[0].rows.find(
      (row) => row.renderData.cinemaName === 'Skyline Cinema'
    );
    expect(skylineRow).toBeDefined();
    expect(skylineRow?.sessions).toHaveLength(2);

    const palazzoRow = result[0].rows.find(
      (row) => row.renderData.cinemaName === 'mooon в ТРЦ Palazzo'
    );
    expect(palazzoRow).toBeDefined();
    expect(palazzoRow?.sessions).toHaveLength(1);
  });

  it('Проверка при пустых значениях', () => {
    const result = groupSessions([], {}, 'movie');
    expect(result).toEqual([]);
  });

  it('Проверка при отсутствующих данных в dataMap', () => {
    const sessions: MovieSession[] = [
      {
        id: 1,
        movieId: 999,
        cinemaId: 4,
        startTime: '2025-10-16T06:00:00.000Z',
      },
    ];

    const result = groupSessions(sessions, {}, 'movie');

    expect(result[0].rows[0].renderData).toEqual({
      movieTitle: '',
      posterImage: '',
    });
  });

  it('Сортировка по возрастанию', () => {
    const sessions: MovieSession[] = [
      { id: 1, movieId: 1, cinemaId: 1, startTime: '2025-10-18T06:00:00.000Z' },
      { id: 2, movieId: 1, cinemaId: 1, startTime: '2025-10-16T06:00:00.000Z' },
      { id: 3, movieId: 1, cinemaId: 1, startTime: '2025-10-17T06:00:00.000Z' },
    ];

    const dataMap: Record<string, Movie> = {
      '1': {
        id: 1,
        title: 'Побег из Шоушенка',
        year: 1994,
        rating: 9.3,
        posterImage: '/static/images/posters/shawshank.jpg',
        lengthMinutes: 142,
        description: 'Два заключённых сближаются...',
      },
    };

    const result = groupSessions(sessions, dataMap, 'movie');

    expect(result).toHaveLength(3);
    expect(result[0].date).toBe('16.10');
    expect(result[1].date).toBe('17.10');
    expect(result[2].date).toBe('18.10');
  });
});
