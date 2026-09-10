import crypto from 'crypto';
import { paymentConfig } from '../../config/payment';

export const paystackWebhooks = {
  verifySignature(payload: string, signature: string): boolean {
    if (!paymentConfig.paystack.webhookSecret) return true;
    const expected = crypto
      .createHmac('sha512', paymentConfig.paystack.webhookSecret)
      .update(payload)
      .digest('hex');
    return expected === signature;
  },
};

export default paystackWebhooks;