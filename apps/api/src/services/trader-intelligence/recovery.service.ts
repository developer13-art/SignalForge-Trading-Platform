export class RecoveryTradingService {
  async detect(userId: string): Promise<boolean> {
    return false;
  }
}

export const recoveryTradingService = new RecoveryTradingService();