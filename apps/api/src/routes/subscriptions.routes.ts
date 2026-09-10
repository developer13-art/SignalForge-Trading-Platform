import { Router } from 'express';
import { subscriptionsController } from '../controllers/subscriptions.controller';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { requireKycForSubscription } from '../middleware/kyc.middleware';
import { requireActiveSubscription } from '../middleware/subscription.middleware';
import { validateBody } from '../middleware/validation.middleware';
import { subscribeSchema } from '../validators/payment.validator';

const router = Router();

router.use(requireAuthenticated());

// Public subscription routes
router.get('/plans', subscriptionsController.getPlans);
router.get('/current', subscriptionsController.getCurrentSubscription);

// Protected routes (require KYC)
router.post(
  '/subscribe',
  requireKycForSubscription(),
  validateBody(subscribeSchema),
  subscriptionsController.subscribe
);

router.post(
  '/verify-payment',
  requireKycForSubscription(),
  subscriptionsController.verifyPayment
);

router.get('/history', subscriptionsController.getSubscriptionHistory);
router.get('/payments', subscriptionsController.getPayments);
router.post('/cancel', subscriptionsController.cancelSubscription);

export default router;