export class SupportService {
  async getDashboard(userId: string) {
    return { openTickets: 0, resolved: 0 };
  }
}

export const supportService = new SupportService();