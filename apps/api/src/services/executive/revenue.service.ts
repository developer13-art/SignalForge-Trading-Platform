export class RevenueService {
  async getRevenueBreakdown() {
    return {
      subscriptions: 0,
      marketplace: 0,
      affiliate: 0,
      ib: 0,
      referralCost: 0,
      net: 0,
    };
  }
}

export const revenueService = new RevenueService();