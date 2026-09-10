import { prisma } from '../../config/database';
import { logger } from '@signalforge/logger';

export class OrderService {
  async createOrder(data: {
    userId: string;
    brokerAccountId: string;
    signalId?: string;
    symbol: string;
    direction: string;
    volume: number;
    entryPrice?: number;
    stopLoss?: number;
    takeProfit?: number;
  }) {
    const order = await prisma.trade.create({
      data: { ...data, status: 'PENDING' },
    });
    logger.info(`Order created: ${order.id}`);
    return order;
  }

  async getPendingOrders(userId: string) {
    return prisma.trade.findMany({
      where: { userId, status: 'PENDING' },
    });
  }
}

export const orderService = new OrderService();