import { apiClient } from '../api/client';

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const notificationService = {
  async getAll(): Promise<Notification[]> {
    try {
      const response = await apiClient.get<{ success: boolean; data: Notification[] }>(
        '/notifications'
      );
      return response.data;
    } catch {
      return [];
    }
  },

  async getUnreadCount(): Promise<number> {
    const response = await apiClient.get<{ success: boolean; data: { count: number } }>(
      '/notifications/unread'
    );
    return response.data.count;
  },

  async markAsRead(id: string): Promise<void> {
    await apiClient.patch(`/notifications/${id}/read`);
  },

  async markAllAsRead(): Promise<void> {
    await apiClient.patch('/notifications/read-all');
  },

  async updatePreferences(preferences: Record<string, boolean>): Promise<void> {
    await apiClient.put('/notifications/preferences', preferences);
  },
};