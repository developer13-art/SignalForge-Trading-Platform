import { useEffect } from 'react';
import { useNotificationStore } from '../stores/notification.store';
import { notificationService } from '../services/notification.service';

export function useNotification() {
  const store = useNotificationStore();

  useEffect(() => {
    notificationService.getAll().then((data) => {
      store.setNotifications(data);
    }).catch(() => {});
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      store.markAsRead(id);
    } catch {}
  };

  return {
    notifications: store.notifications,
    unreadCount: store.unreadCount,
    markAsRead,
    markAllAsRead: async () => {
      await notificationService.markAllAsRead();
      store.markAllAsRead();
    },
  };
}