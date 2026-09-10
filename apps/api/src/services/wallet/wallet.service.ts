import { prisma } from '../../config/database';

export class WalletService {
  async getOrCreate(userId: string) {
    let wallet = await prisma.referralWallet.findUnique({ where: { userId } });
    if (!wallet) {
      wallet = await prisma.referralWallet.create({ data: { userId } });
    }
    return wallet;
  }

  async getBalance(userId: string) {
    const wallet = await this.getOrCreate(userId);
    return {
      available: wallet.availableBalance,
      pending: wallet.pendingBalance,
      lifetime: wallet.lifetimeEarned,
    };
  }
}

export const walletService = new WalletService();