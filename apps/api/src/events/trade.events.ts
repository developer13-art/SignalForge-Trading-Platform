import { eventBus } from './event-bus';

export const tradeEvents = {
  async riskApproved(data: { tradeId: string; userId: string }) {
    await eventBus.publish('RiskApproved', data, { userId: data.userId });
  },

  async riskRejected(data: { signalId: string; userId: string; reasons: string[] }) {
    await eventBus.publish('RiskRejected', data, { userId: data.userId });
  },

  async tradeExecuted(data: { tradeId: string; userId: string; symbol: string }) {
    await eventBus.publish('TradeExecuted', data, { userId: data.userId });
  },

  async tradeClosed(data: { tradeId: string; userId: string; profit: number }) {
    await eventBus.publish('TradeClosed', data, { userId: data.userId });
  },
};

export default tradeEvents;