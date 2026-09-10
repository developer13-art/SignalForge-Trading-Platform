export class IbService {
  async getIbStats(userId: string) {
    return { referrals: 0, revenue: 0 };
  }
}

export const ibService = new IbService();