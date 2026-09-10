import { apiClient } from '../api/client';

export interface AdminOverview {
  users: { total: number; active: number; newToday: number; verified: number };
  kyc: { pending: number };
  providers: { total: number };
  trades: { total: number; today: number };
  subscriptions: { active: number };
  revenue: { total: number };
}

export const adminService = {
  async getOverview(): Promise<AdminOverview> {
    const response = await apiClient.get<{ success: boolean; data: AdminOverview }>(
      '/admin/overview'
    );
    return response.data;
  },

  async getUsers(params: { page?: number; limit?: number; search?: string }) {
    const response = await apiClient.get('/admin/users', { params });
    return response.data;
  },

  async updateUserStatus(userId: string, status: string, reason?: string) {
    const response = await apiClient.patch(`/admin/users/${userId}/status`, { status, reason });
    return response.data;
  },

  async getAuditLogs(params: { page?: number; limit?: number; action?: string }) {
    const response = await apiClient.get('/admin/audit-logs', { params });
    return response.data;
  },

  async getSystemHealth() {
    const response = await apiClient.get('/admin/system-health');
    return response.data;
  },

  async getRevenueStats() {
    const response = await apiClient.get('/admin/revenue');
    return response.data;
  },
};