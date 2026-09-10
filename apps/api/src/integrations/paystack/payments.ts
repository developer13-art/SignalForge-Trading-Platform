import { paystackClient } from './client';

export const paystackPayments = {
  async initialize(data: {
    email: string;
    amount: number;
    reference: string;
    callbackUrl?: string;
    metadata?: Record<string, unknown>;
  }) {
    const response = await paystackClient.http.post('/transaction/initialize', {
      email: data.email,
      amount: data.amount,
      reference: data.reference,
      callback_url: data.callbackUrl,
      metadata: data.metadata,
    });
    return response.data.data;
  },

  async verify(reference: string) {
    const response = await paystackClient.http.get(`/transaction/verify/${reference}`);
    return response.data.data;
  },
};

export default paystackPayments;