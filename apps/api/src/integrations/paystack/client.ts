import axios, { AxiosInstance } from 'axios';
import { paymentConfig } from '../../config/payment';

export class PaystackClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.paystack.co',
      headers: {
        Authorization: `Bearer ${paymentConfig.paystack.secretKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  get http() {
    return this.client;
  }
}

export const paystackClient = new PaystackClient();
export default paystackClient;