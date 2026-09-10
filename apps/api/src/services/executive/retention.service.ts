export class RetentionService {
  async getRetention() {
    return { retention30d: 0, churnRate: 0, conversion: 0 };
  }
}

export const retentionService = new RetentionService();