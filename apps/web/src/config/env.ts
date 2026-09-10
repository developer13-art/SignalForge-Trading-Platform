export const env = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  WS_URL: import.meta.env.VITE_WS_URL || 'ws://localhost:4000/ws',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'SignalForge AI',
  APP_URL: import.meta.env.VITE_APP_URL || 'http://localhost:3000',
  ENVIRONMENT: import.meta.env.MODE || 'development',
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
} as const;