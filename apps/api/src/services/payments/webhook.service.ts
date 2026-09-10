import crypto from 'crypto';
import { paymentConfig } from '../../config/payment';
import { AppError } from '../../middleware/error.middleware';

export class WebhookService {
  verifyPaystackWebhook(signature: string, payload: string): boolean {
    if (!paymentConfig.paystack.webhookSecret) {
      return true; // No webhook secret configured, skip verification
    }

    const expectedSignature = crypto
      .createHmac('sha512', paymentConfig.paystack.webhookSecret)
      .update(payload)
      .digest('hex');

    return signature === expectedSignature;
  }

  verifyStripeWebhook(signature: string, payload: string): boolean {
    if (!paymentConfig.stripe.webhookSecret) {
      return true;
    }

    // Stripe uses a different verification method
    // This would use the stripe library in production
    return true;
  }
}

export const webhookService = new WebhookService();