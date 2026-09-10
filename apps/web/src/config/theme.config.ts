export const themeConfig = {
  defaultTheme: 'light' as 'light' | 'dark',
  storageKey: 'signalforge-theme',
  colors: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    success: '#22c55e',
    danger: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
  fontFamily: {
    sans: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
} as const;