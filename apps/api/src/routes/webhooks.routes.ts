import { Router, raw } from 'express';
import { paymentService } from '../services/payments/payment.service';
import { logger } from '@signalforge/logger';

const router = Router();

router.post('/paystack', raw({ type: 'application/json' }), async (req, res) => {
  try {
    const result = await paymentService.handlePaystackWebhook(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    logger.error('Paystack webhook error:', error);
    res.json({ success: false });
  }
});

router.post('/stripe', raw({ type: 'application/json' }), (req, res) => {
  res.json({ success: true });
});

export default router;