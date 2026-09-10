import { apiClient } from '../api/client';

export const deviceService = {
  async getSessions(): Promise<any[]> {
    try {
      const response = await apiClient.get<{ success: boolean; data: any[] }>('/users/sessions');
      return response.data;
    } catch {
      return [];
    }
  },

  async revokeSession(id: string): Promise<void> {
    await apiClient.delete(`/users/sessions/${id}`);
  },
};