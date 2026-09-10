export class FinancialService {
  async getFinancialStatements() {
    return {
      income: 0,
      expenses: 0,
      netIncome: 0,
    };
  }
}

export const financialService = new FinancialService();