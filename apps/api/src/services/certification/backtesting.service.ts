export class BacktestingService {
  async run(providerId: string, messages: string[]) {
    return {
      providerId,
      processed: messages.length,
      signalsDetected: 0,
      parsingAccuracy: 0,
    };
  }
}

export const backtestingService = new BacktestingService();