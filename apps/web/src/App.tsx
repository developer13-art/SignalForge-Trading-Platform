import React, { useEffect } from 'react';
import { useThemeStore } from './stores/theme.store';
import { useAuthStore } from './stores/auth.store';
import { wsService } from './services/websocket.service';
import AppRoutes from './routes';

export default function App() {
  const { theme } = useThemeStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (isAuthenticated) {
      wsService.connect();
    } else {
      wsService.disconnect();
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <AppRoutes />
    </div>
  );
}