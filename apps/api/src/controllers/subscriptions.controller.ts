import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { subscriptionService } from '../services/subscriptions/subscription.service';
import { planService } from '../services/subscriptions/plan.service';
import { paymentService } from '../services/payments/payment.service';

export class SubscriptionsController {
  async getPlans(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const plans = await planService.getAllPlans();
      res.json({ success: true, data: plans });
    } catch (error) {
      next(error);
    }
  }

  async getCurrentSubscription(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const subscription = await subscriptionService.getUserSubscriptionStatus(req.user!.id);
      res.json({ success: true, data: subscription });
    } catch (error) {
      next(error);
    }
  }

  async subscribe(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { planId } = req.body;
      const result = await paymentService.initializeSubscription(
        req.user!.id,
        planId,
        req.user!.email
      );
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async cancelSubscription(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { reason } = req.body;
      const result = await subscriptionService.cancelSubscription(req.user!.id, reason);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getSubscriptionHistory(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const history = await subscriptionService.getSubscriptionHistory(req.user!.id);
      res.json({ success: true, data: history });
    } catch (error) {
      next(error);
    }
  }

  async getPayments(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const payments = await paymentService.getUserPayments(req.user!.id);
      res.json({ success: true, data: payments });
    } catch (error) {
      next(error);
    }
  }

  async verifyPayment(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { reference } = req.body;
      const result = await paymentService.verifyPayment(reference);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}

export const subscriptionsController = new SubscriptionsController();