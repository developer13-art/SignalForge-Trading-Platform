import axios from 'axios';
import { paymentConfig } from '../../config/payment';
import { logger } from '@signalforge/logger';
import { PaystackInitializeResponse } from '../../types/payment.types';

export class PaystackService {
  private readonly baseUrl = 'https://api.paystack.co';
  private readonly secretKey: string;

  constructor() {
    this.secretKey = paymentConfig.paystack.secretKey;
  }

  private getHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.secretKey}`,
      'Content-Type': 'application/json',
    };
  }

  async initializeTransaction(data: {
    email: string;
    amount: number; // In kobo (NGN) or cents (USD)
    reference: string;
    callbackUrl?: string;
    metadata?: Record<string, unknown>;
  }): Promise<PaystackInitializeResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/transaction/initialize`,
        {
          email: data.email,
          amount: data.amount,
          reference: data.reference,
          callback_url: data.callbackUrl,
          metadata: data.metadata,
        },
        { headers: this.getHeaders() }
      );

      return response.data.data;
    } catch (error) {
      logger.error('Paystack initialize error:', error);
      throw error;
    }
  }

  async verifyTransaction(reference: string) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/transaction/verify/${reference}`,
        { headers: this.getHeaders() }
      );

      return response.data.data;
    } catch (error) {
      logger.error('Paystack verify error:', error);
      throw error;
    }
  }

  async createPlan(data: {
    name: string;
    amount: number;
    interval: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'annually';
    description?: string;
  }) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/plan`,
        data,
        { headers: this.getHeaders() }
      );

      return response.data.data;
    } catch (error) {
      logger.error('Paystack create plan error:', error);
      throw error;
    }
  }

  async createSubscription(data: {
    customer: string;
    plan: string;
    authorization?: string;
  }) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/subscription`,
        data,
        { headers: this.getHeaders() }
      );

      return response.data.data;
    } catch (error) {
      logger.error('Paystack create subscription error:', error);
      throw error;
    }
  }

  async getBanks() {
    try {
      const response = await axios.get(
        `${this.baseUrl}/bank`,
        { headers: this.getHeaders() }
      );

      return response.data.data;
    } catch (error) {
      logger.error('Paystack get banks error:', error);
      throw error;
    }
  }

  async resolveAccountNumber(accountNumber: string, bankCode: string) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
        { headers: this.getHeaders() }
      );

      return response.data.data;
    } catch (error) {
      logger.error('Paystack resolve account error:', error);
      throw error;
    }
  }

  async createTransferRecipient(data: {
    type: 'nuban';
    name: string;
    account_number: string;
    bank_code: string;
    currency: string;
  }) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/transferrecipient`,
        data,
        { headers: this.getHeaders() }
      );

      return response.data.data;
    } catch (error) {
      logger.error('Paystack create transfer recipient error:', error);
      throw error;
    }
  }

  async initiateTransfer(data: {
    source: string;
    amount: number;
    recipient: string;
    reason?: string;
  }) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/transfer`,
        data,
        { headers: this.getHeaders() }
      );

      return response.data.data;
    } catch (error) {
      logger.error('Paystack initiate transfer error:', error);
      throw error;
    }
  }
}

export const paystackService = new PaystackService();