import { Router } from 'express';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { requireKycVerified } from '../middleware/kyc.middleware';
import { prisma } from '../config/database';

const router = Router();
router.use(requireAuthenticated());

router.get('/overview', async (req, res, next) => {
  try {
    const wallet = await prisma.referralWallet.findUnique({
      where: { userId: (req as any).user.id },
    });
    res.json({ success: true, data: wallet });
  } catch (error) { next(error); }
});

router.get('/transactions', async (req, res, next) => {
  try {
    const wallet = await prisma.referralWallet.findUnique({
      where: { userId: (req as any).user.id },
    });
    if (!wallet) return res.json({ success: true, data: [] });

    const ledger = await prisma.referralLedger.findMany({
      where: { walletId: wallet.id },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    res.json({ success: true, data: ledger });
  } catch (error) { next(error); }
});

router.post('/withdraw', requireKycVerified(), async (req, res, next) => {
  try {
    const { amount, method } = req.body;
    const request = await prisma.withdrawalRequest.create({
      data: {
        userId: (req as any).user.id,
        amount,
        status: 'PENDING',
        paymentDetails: { method },
      },
    });
    res.json({ success: true, data: request });
  } catch (error) { next(error); }
});

router.get('/withdrawals', async (req, res, next) => {
  try {
    const withdrawals = await prisma.withdrawalRequest.findMany({
      where: { userId: (req as any).user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: withdrawals });
  } catch (error) { next(error); }
});

export default router;