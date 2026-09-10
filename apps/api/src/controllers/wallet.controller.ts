import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { prisma } from '../config/database';

export class WalletController {
  async getOverview(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const wallet = await prisma.referralWallet.findUnique({
        where: { userId: req.user!.id },
      });
      res.json({ success: true, data: wallet });
    } catch (error) { next(error); }
  }

  async getTransactions(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const wallet = await prisma.referralWallet.findUnique({
        where: { userId: req.user!.id },
      });
      if (!wallet) return res.json({ success: true, data: [] });
      const ledger = await prisma.referralLedger.findMany({
        where: { walletId: wallet.id },
        orderBy: { createdAt: 'desc' },
      });
      res.json({ success: true, data: ledger });
    } catch (error) { next(error); }
  }

  async requestWithdrawal(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { amount, method } = req.body;
      const request = await prisma.withdrawalRequest.create({
        data: {
          userId: req.user!.id,
          amount,
          status: 'PENDING',
          paymentDetails: { method },
        },
      });
      res.json({ success: true, data: request });
    } catch (error) { next(error); }
  }
}

export const walletController = new WalletController();