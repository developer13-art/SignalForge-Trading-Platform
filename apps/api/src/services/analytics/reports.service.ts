export class ReportsService {
  async generatePerformanceReport(userId: string): Promise<any> {
    return {
      userId,
      generatedAt: new Date().toISOString(),
      metrics: {},
    };
  }

  async generateCsvReport(userId: string): Promise<string> {
    return 'symbol,direction,volume,pnl\n';
  }
}

export const reportsService = new ReportsService();