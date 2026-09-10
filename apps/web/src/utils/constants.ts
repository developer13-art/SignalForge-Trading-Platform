export const APP_NAME = 'SignalForge AI';
export const APP_VERSION = '1.0.0';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  SIGNALS: '/signals',
  TRADING: '/trading',
  BROKERS: '/brokers',
  ANALYTICS: '/analytics',
  REFERRALS: '/referrals',
  SUBSCRIPTIONS: '/subscriptions',
  WALLET: '/wallet',
  SETTINGS: '/settings',
  KYC: '/kyc',
  SUPPORT: '/support',
  ADMIN: '/admin',
} as const;

export const TIMEZONES = [
  'UTC',
  'America/New_York',
  'Europe/London',
  'Asia/Tokyo',
  'Australia/Sydney',
];

export const CURRENCIES = ['USD', 'EUR', 'GBP', 'NGN', 'ZAR'];

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;