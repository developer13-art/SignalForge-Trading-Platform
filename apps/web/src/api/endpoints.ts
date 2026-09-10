export const ENDPOINTS = {
  // Auth
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION: '/auth/resend-verification',
    TWO_FACTOR_SETUP: '/auth/2fa/setup',
    TWO_FACTOR_VERIFY: '/auth/2fa/verify',
    TWO_FACTOR_DISABLE: '/auth/2fa/disable',
    ME: '/auth/me',
  },

  // Users
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
    SESSIONS: '/users/sessions',
    REVOKE_SESSION: '/users/sessions/:id/revoke',
    DEVICES: '/users/devices',
  },

  // KYC
  KYC: {
    STATUS: '/kyc/status',
    START: '/kyc/start',
    SUBMIT_PERSONAL_INFO: '/kyc/personal-info',
    UPLOAD_DOCUMENT: '/kyc/documents',
    SUBMIT_VERIFICATION: '/kyc/submit',
    RESUBMIT: '/kyc/resubmit',
    DOCUMENT_TYPES: '/kyc/document-types',
  },

  // Dashboard
  DASHBOARD: {
    OVERVIEW: '/dashboard/overview',
    ACCOUNT_SUMMARY: '/dashboard/account-summary',
    PORTFOLIO: '/dashboard/portfolio',
    RECENT_TRADES: '/dashboard/recent-trades',
    ACTIVE_SIGNALS: '/dashboard/active-signals',
    PNL: '/dashboard/pnl',
    RISK_OVERVIEW: '/dashboard/risk-overview',
  },

  // Signals
  SIGNALS: {
    BASE: '/signals',
    LIVE: '/signals/live',
    HISTORY: '/signals/history',
    DETAILS: '/signals/:id',
    REPLAY: '/signals/:id/replay',
    CONFIDENCE: '/signals/:id/confidence',
    DUPLICATES: '/signals/duplicates',
    CONSENSUS: '/signals/consensus',
    REJECTED: '/signals/rejected',
  },

  // Signal Sources
  SIGNAL_SOURCES: {
    BASE: '/signal-sources',
    TELEGRAM_CONNECT: '/signal-sources/telegram/connect',
    TELEGRAM_CHANNELS: '/signal-sources/telegram/channels',
    TELEGRAM_SELECT_CHANNEL: '/signal-sources/telegram/channels/select',
    DISCORD_CONNECT: '/signal-sources/discord/connect',
    TRADINGVIEW_WEBHOOKS: '/signal-sources/tradingview/webhooks',
    REST_API: '/signal-sources/rest-api',
    EMAIL: '/signal-sources/email',
    MESSAGES: '/signal-sources/messages',
    MESSAGE_DETAILS: '/signal-sources/messages/:id',
  },

  // Trading
  TRADING: {
    BASE: '/trading',
    POSITIONS: '/trading/positions',
    OPEN_POSITIONS: '/trading/positions/open',
    CLOSED_POSITIONS: '/trading/positions/closed',
    PENDING_ORDERS: '/trading/orders/pending',
    TRADES: '/trading/trades',
    TRADE_DETAILS: '/trading/trades/:id',
    TRADE_EVENTS: '/trading/trades/:id/events',
    TRADE_TIMELINE: '/trading/trades/:id/timeline',
    TRADE_REPLAY: '/trading/trades/:id/replay',
    EXECUTION_HISTORY: '/trading/execution-history',
    MANUAL_INTERVENTIONS: '/trading/interventions',
  },

  // Risk
  RISK: {
    PROFILE: '/risk/profile',
    UPDATE_PROFILE: '/risk/profile',
    RULES: '/risk/rules',
    CREATE_RULE: '/risk/rules',
    UPDATE_RULE: '/risk/rules/:id',
    DELETE_RULE: '/risk/rules/:id',
    DAILY_LOSS: '/risk/daily-loss',
    DRAWDOWN: '/risk/drawdown',
    EXPOSURE: '/risk/exposure',
    EVENTS: '/risk/events',
    EMERGENCY_STOP: '/risk/emergency-stop',
  },

  // Brokers
  BROKERS: {
    BASE: '/brokers',
    ACCOUNTS: '/brokers/accounts',
    CONNECT: '/brokers/accounts/connect',
    ACCOUNT_DETAILS: '/brokers/accounts/:id',
    DISCONNECT: '/brokers/accounts/:id/disconnect',
    SYNC: '/brokers/accounts/:id/sync',
    STATUS: '/brokers/accounts/:id/status',
    LOGS: '/brokers/accounts/:id/logs',
    METRICS: '/brokers/accounts/:id/metrics',
  },

  // Analytics
  ANALYTICS: {
    OVERVIEW: '/analytics/overview',
    PERFORMANCE: '/analytics/performance',
    EQUITY_CURVE: '/analytics/equity-curve',
    PNL: '/analytics/pnl',
    DRAWDOWN: '/analytics/drawdown',
    WIN_RATE: '/analytics/win-rate',
    RATIOS: '/analytics/ratios',
    SYMBOLS: '/analytics/symbols',
    LATENCY: '/analytics/latency',
    REPORTS: '/analytics/reports',
    EXPORT: '/analytics/export',
  },

  // Marketplace
  MARKETPLACE: {
    PROVIDERS: '/marketplace/providers',
    PROVIDER_DETAILS: '/marketplace/providers/:id',
    PROVIDER_REVIEWS: '/marketplace/providers/:id/reviews',
    SUBSCRIBE: '/marketplace/providers/:id/subscribe',
    MY_PROVIDERS: '/marketplace/my-providers',
    COMPARE: '/marketplace/compare',
    TRADERS: '/marketplace/traders',
    TRADER_DETAILS: '/marketplace/traders/:id',
    FOLLOW_TRADER: '/marketplace/traders/:id/follow',
  },

  // Referrals
  REFERRALS: {
    DASHBOARD: '/referrals/dashboard',
    CODE: '/referrals/code',
    LINK: '/referrals/link',
    NETWORK: '/referrals/network',
    REFERRED_USERS: '/referrals/users',
    EARNINGS: '/referrals/earnings',
    REWARDS: '/referrals/rewards',
    WALLET: '/referrals/wallet',
    HISTORY: '/referrals/history',
    SETTLEMENT: '/referrals/settlement',
    LEADERBOARD: '/referrals/leaderboard',
  },

  // Subscriptions
  SUBSCRIPTIONS: {
    PLANS: '/subscriptions/plans',
    CURRENT: '/subscriptions/current',
    SUBSCRIBE: '/subscriptions/subscribe',
    CANCEL: '/subscriptions/cancel',
    HISTORY: '/subscriptions/history',
    INVOICES: '/subscriptions/invoices',
    USAGE: '/subscriptions/usage',
  },

  // Wallet
  WALLET: {
    OVERVIEW: '/wallet/overview',
    BALANCE: '/wallet/balance',
    TRANSACTIONS: '/wallet/transactions',
    WITHDRAW: '/wallet/withdraw',
    WITHDRAWALS: '/wallet/withdrawals',
    PAYMENT_ACCOUNTS: '/wallet/payment-accounts',
  },

  // Notifications
  NOTIFICATIONS: {
    BASE: '/notifications',
    UNREAD: '/notifications/unread',
    MARK_READ: '/notifications/:id/read',
    MARK_ALL_READ: '/notifications/read-all',
    PREFERENCES: '/notifications/preferences',
  },

  // Admin
  ADMIN: {
    OVERVIEW: '/admin/overview',
    USERS: '/admin/users',
    USER_DETAILS: '/admin/users/:id',
    KYC: '/admin/kyc',
    KYC_REVIEW: '/admin/kyc/:id/review',
    PROVIDERS: '/admin/providers',
    TRADERS: '/admin/traders',
    SIGNALS: '/admin/signals',
    TRADES: '/admin/trades',
    BROKERS: '/admin/brokers',
    SUBSCRIPTIONS: '/admin/subscriptions',
    PAYMENTS: '/admin/payments',
    REFERRALS: '/admin/referrals',
    WITHDRAWALS: '/admin/withdrawals',
    AUDIT_LOGS: '/admin/audit-logs',
    SYSTEM_SETTINGS: '/admin/settings',
    SYSTEM_HEALTH: '/admin/system-health',
  },
};