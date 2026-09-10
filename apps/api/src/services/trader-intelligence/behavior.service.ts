export class BehaviorService {
  async analyze(userId: string) {
    return {
      avgHoldingTime: 0,
      avgRR: 0,
      tradeFrequency: 0,
    };
  }
}

export const behaviorService = new BehaviorService();