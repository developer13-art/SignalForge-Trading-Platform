export class ReplayService {
  async replayTrade(tradeId: string) {
    return { tradeId };
  }
}

export const replayService = new ReplayService();