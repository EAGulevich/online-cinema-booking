import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { PropsWithChildren } from 'react';

import { useGetSettings } from '@generatedApi/settings/settings.ts';

import { type Settings } from './types';

const defaultValue: Settings = {
  token: null,
  bookingPaymentTimeSeconds: 0,
  onLogin: () => null,
  onLogout: () => null,
};

const SettingsContext = createContext<Settings>(defaultValue);

const LOCAL_STORAGE_TOKEN_KEY = 'token';

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { data } = useGetSettings({
    query: {
      staleTime: Infinity,
    },
  });

  const [token, setToken] = useState<string | null>(
    localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) ?? null
  );

  const [bookingPaymentTimeSeconds, setBookingPaymentTimeSeconds] =
    useState<number>(0);

  useEffect(() => {
    if (data) {
      setBookingPaymentTimeSeconds(data?.data.bookingPaymentTimeSeconds ?? 0);
    }
  }, [data]);

  const onLogin = useCallback((token: string) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
    setToken(token);
  }, []);

  const onLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    setToken(null);
  }, []);

  const settings: Settings = useMemo(
    () => ({
      token,
      bookingPaymentTimeSeconds,
      onLogin,
      onLogout,
    }),
    [bookingPaymentTimeSeconds, onLogin, onLogout, token]
  );

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};
