export const APP_CONFIG = {
  name: 'SignalForge AI',
  version: '1.0.0',
  description: 'Enterprise Trading Intelligence Platform',
  defaultLocale: 'en',
  defaultCurrency: 'USD',
  defaultTimezone: 'UTC',
  pageSize: 20,
  maxPageSize: 100,
  debounceDelay: 300,
  toastDuration: 4000,
  sessionTimeoutMs: 30 * 60 * 1000,
} as const;

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  timeout: 30000,
  retryAttempts: 3,
} as const;