import { prisma } from '../../config/database';

export class InvoiceService {
  async getUserInvoices(userId: string) {
    return prisma.payment.findMany({
      where: { userId, status: 'SUCCESS' },
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const invoiceService = new InvoiceService();