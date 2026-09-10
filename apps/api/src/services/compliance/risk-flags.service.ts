export class RiskFlagsService {
  async listFlags() {
    return [];
  }

  async flagUser(userId: string, reason: string) {
    return { flagged: true };
  }
}

export const riskFlagsService = new RiskFlagsService();