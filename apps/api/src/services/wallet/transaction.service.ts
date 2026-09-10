import { prisma } from '../../config/database';

export class TransactionService {
  async getTransactions(walletId: string) {
    return prisma.referralLedger.findMany({
      where: { walletId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createEntry(data: {
    walletId: string;
    entryType: string;
    amount: number;
    reference: string;
    description?: string;
  }) {
    return prisma.referralLedger.create({ data });
  }
}

export const transactionService = new TransactionService();