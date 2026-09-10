export class IntelligenceService {
  async analyzeTrader(traderId: string) {
    return {
      traderId,
      consistency: 0,
      discipline: 0,
      style: 'Unknown',
      riskScore: 0,
    };
  }
}

export const intelligenceService = new IntelligenceService();