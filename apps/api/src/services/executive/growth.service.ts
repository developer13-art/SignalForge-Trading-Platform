export class GrowthService {
  async getUserGrowth() {
    return { total: 0, thisMonth: 0, growth: 0 };
  }
}

export const growthService = new GrowthService();