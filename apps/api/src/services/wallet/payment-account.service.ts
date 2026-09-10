export class PaymentAccountService {
  async list(userId: string) {
    return [];
  }

  async add(userId: string, data: any) {
    return data;
  }
}

export const paymentAccountService = new PaymentAccountService();