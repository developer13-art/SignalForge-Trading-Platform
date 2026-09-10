export class ComplianceReportsService {
  async generateKycReport(period: { start: Date; end: Date }) {
    return { period, stats: {} };
  }
}

export const complianceReportsService = new ComplianceReportsService();