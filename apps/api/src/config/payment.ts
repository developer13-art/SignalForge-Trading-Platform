// apps/api/src/config/payment.ts
import { env } from './env';

export const paymentConfig = {
  paystack: {
    secretKey: env.PAYSTACK_SECRET_KEY || '',
    publicKey: env.PAYSTACK_PUBLIC_KEY || '',
    webhookSecret: env.PAYSTACK_WEBHOOK_SECRET || '',
    baseUrl: 'https://api.paystack.co',
  },
  
  stripe: {
    secretKey: env.STRIPE_SECRET_KEY || '',
    webhookSecret: env.STRIPE_WEBHOOK_SECRET || '',
    apiVersion: '2024-06-20',
  },
  
  primaryProvider: 'paystack' as 'paystack' | 'stripe',
  
  isValid(): boolean {
    return Boolean(this.paystack.secretKey || this.stripe.secretKey);
  },
};

export default paymentConfig;