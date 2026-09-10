import { useEffect } from 'react';
import { wsService } from '../services/websocket.service';
import { useAuthStore } from '../stores/auth.store';

export function useWebSocket() {
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      wsService.connect();
    }
    return () => {
      // Keep connection alive on unmount
    };
  }, [isAuthenticated]);

  return {
    on: wsService.on.bind(wsService),
  };
}