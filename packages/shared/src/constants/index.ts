// packages/shared/src/constants/index.ts
export const DEFAULT_REFERRAL_REWARD_RATE = 0.001; // 0.1%
export const DEFAULT_MIN_CONFIDENCE_SCORE = 80;
export const DEFAULT_MAX_DAILY_LOSS = 3; // 3%
export const DEFAULT_MAX_DRAWDOWN = 10; // 10%
export const DEFAULT_MAX_OPEN_TRADES = 5;
export const DEFAULT_RISK_PERCENT = 1; // 1%
export const DEFAULT_LOT_SIZE = 0.01;

export const SUPPORTED_SYMBOLS = [
  'EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'AUDUSD',
  'NZDUSD', 'USDCAD', 'XAUUSD', 'XAGUSD', 'BTCUSD',
  'ETHUSD', 'GBPJPY', 'EURJPY', 'EURGBP', 'EURCHF',
] as const;

export const SUPPORTED_TIMEFRAMES = [
  'M1', 'M5', 'M15', 'M30', 'H1', 'H4', 'D1', 'W1', 'MN',
] as const;

export const KYC_DOCUMENT_TYPES = [
  'NATIONAL_ID',
  'VOTERS_CARD',
  'DRIVERS_LICENSE',
  'INTERNATIONAL_PASSPORT',
  'OTHER',
] as const;

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
export const SUPPORTED_UPLOAD_FORMATS = ['jpg', 'jpeg', 'png', 'pdf'] as const;

export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
export const RATE_LIMIT_MAX_REQUESTS = 100;

export const JWT_ACCESS_EXPIRES_IN = '15m';
export const JWT_REFRESH_EXPIRES_IN = '7d';

export const TELEGRAM_SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
export const METAAPI_SYNC_INTERVAL_MS = 60 * 1000; // 1 minute