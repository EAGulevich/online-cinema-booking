export interface Settings {
  token: string | null;
  bookingPaymentTimeSeconds: number;
  onLogin: (token: string) => void;
  onLogout: () => void;
}
