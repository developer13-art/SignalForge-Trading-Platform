import { Router } from 'express';
import { tradingController } from '../controllers/trading.controller';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { requireKycForTrading } from '../middleware/kyc.middleware';

const router = Router();

router.use(requireAuthenticated());

router.get('/positions', tradingController.getOpenPositions);
router.get('/trades', tradingController.getTradeHistory);
router.get('/trades/:id', tradingController.getTradeDetails);
router.post('/trades/:id/close', requireKycForTrading(), tradingController.closeTrade);
router.patch('/trades/:id', requireKycForTrading(), tradingController.modifyTrade);
router.post('/trades/:id/break-even', requireKycForTrading(), tradingController.moveToBreakEven);

export default router;