import { Router } from 'express';
import { analyticsController } from '../controllers/analytics.controller';
import { requireAuthenticated } from '../middleware/auth.middleware';

const router = Router();

router.use(requireAuthenticated());

router.get('/performance', analyticsController.getPerformance);
router.get('/equity-curve', analyticsController.getEquityCurve);
router.get('/symbols', analyticsController.getSymbolPerformance);
router.get('/providers', analyticsController.getProviderPerformance);
router.get('/calendar', analyticsController.getTradingCalendar);
router.get('/latency', analyticsController.getLatencyStats);

export default router;