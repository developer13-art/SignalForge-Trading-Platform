import { apiClient } from '../api/client';

export const supportService = {
  async getTickets(): Promise<any[]> {
    try {
      const response = await apiClient.get<{ success: boolean; data: any[] }>('/support/tickets');
      return response.data;
    } catch {
      return [];
    }
  },

  async createTicket(data: { subject: string; description: string; category: string; priority: string }): Promise<any> {
    const response = await apiClient.post<{ success: boolean; data: any }>('/support/tickets', data);
    return response.data;
  },

  async getTicket(id: string): Promise<any> {
    const response = await apiClient.get<{ success: boolean; data: any }>(`/support/tickets/${id}`);
    return response.data;
  },

  async replyToTicket(id: string, message: string): Promise<void> {
    await apiClient.post(`/support/tickets/${id}/reply`, { message });
  },

  async contactTechnical(data: { email: string; issue: string; logs?: string }): Promise<void> {
    await apiClient.post('/support/technical', data);
  },
};