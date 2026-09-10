import { prisma } from '../../config/database';

export class PaymentVerificationService {
  async verifyPayment(reference: string) {
    return prisma.payment.findFirst({
      where: { providerRef: reference },
    });
  }

  async getPaymentStatus(reference: string) {
    const payment = await this.verifyPayment(reference);
    return payment?.status || 'UNKNOWN';
  }
}

export const paymentVerificationService = new PaymentVerificationService();