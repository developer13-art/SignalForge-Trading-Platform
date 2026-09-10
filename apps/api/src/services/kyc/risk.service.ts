export class KycRiskService {
  async assessRisk(applicationId: string): Promise<{ score: number; flags: string[] }> {
    return { score: 10, flags: [] };
  }

  async screenSanctions(name: string, country: string): Promise<{ match: boolean }> {
    return { match: false };
  }
}

export const kycRiskService = new KycRiskService();