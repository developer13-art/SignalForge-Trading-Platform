import { Request, Response, NextFunction } from 'express';
import { paymentService } from '../services/payments/payment.service';
import { webhookService } from '../services/payments/webhook.service';
import { logger } from '@signalforge/logger';

export class WebhooksController {
  async handlePaystackWebhook(req: Request, res: Response, next: NextFunction) {
    try {
      const signature = req.headers['x-paystack-signature'] as string;
      const payload = JSON.stringify(req.body);

      // Verify webhook signature
      const isValid = webhookService.verifyPaystackWebhook(signature, payload);
      if (!isValid) {
        logger.warn('Invalid Paystack webhook signature');
        res.status(401).json({ success: false, message: 'Invalid signature' });
        return;
      }

      const result = await paymentService.handlePaystackWebhook(req.body);

      // Always return 200 to Paystack
      res.json({ success: true, data: result });
    } catch (error) {
      logger.error('Paystack webhook error:', error);
      // Still return 200 to prevent Paystack retries
      res.json({ success: false, error: 'Webhook processing failed' });
    }
  }

  async handleStripeWebhook(req: Request, res: Response, next: NextFunction) {
    try {
      const signature = req.headers['stripe-signature'] as string;
      const payload = JSON.stringify(req.body);

      const isValid = webhookService.verifyStripeWebhook(signature, payload);
      if (!isValid) {
        res.status(401).json({ success: false, message: 'Invalid signature' });
        return;
      }

      res.json({ success: true, message: 'Stripe webhook received' });
    } catch (error) {
      logger.error('Stripe webhook error:', error);
      res.json({ success: false, error: 'Webhook processing failed' });
    }
  }
}

export const webhooksController = new WebhooksController();