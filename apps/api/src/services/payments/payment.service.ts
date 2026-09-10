import crypto from 'crypto';
import { prisma } from '../../config/database';
import { subscriptionService } from '../subscriptions/subscription.service';
import { paystackService } from './paystack.service';
import { paymentConfig } from '../../config/payment';
import { AppError } from '../../middleware/error.middleware';
import { logger } from '@signalforge/logger';
import { PaymentWebhookPayload } from '../../types/payment.types';

export class PaymentService {
  async initializeSubscription(userId: string, planId: string, email: string) {
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    });

    if (!plan || !plan.isActive) {
      throw new AppError('Plan not found or inactive', 404);
    }

    const reference = `SF-${Date.now()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    // Convert to kobo/cents
    const amountInMinorUnit = Math.round(plan.price * 100);

    const initialization = await paystackService.initializeTransaction({
      email,
      amount: amountInMinorUnit,
      reference,
      callbackUrl: `${process.env.APP_URL}/subscriptions/verify`,
      metadata: {
        userId,
        planId,
        planName: plan.name,
      },
    });

    // Create pending payment record
    await prisma.payment.create({
      data: {
        subscriptionId: 'pending', // Will update after subscription created
        userId,
        amount: plan.price,
        currency: 'USD',
        status: 'PENDING',
        provider: 'PAYSTACK',
        providerRef: reference,
        metadata: {
          planId,
          planName: plan.name,
          accessCode: initialization.access_code,
        },
      },
    });

    return {
      authorizationUrl: initialization.authorization_url,
      accessCode: initialization.access_code,
      reference,
    };
  }

  async handlePaystackWebhook(payload: PaymentWebhookPayload) {
    const { event, data } = payload;

    logger.info(`Paystack webhook received: ${event}`);

    switch (event) {
      case 'charge.success':
        return this.handleSuccessfulPayment(data);
      case 'charge.failed':
        return this.handleFailedPayment(data);
      case 'subscription.create':
        return this.handleSubscriptionCreated(data);
      case 'subscription.disable':
        return this.handleSubscriptionDisabled(data);
      default:
        logger.info(`Unhandled Paystack event: ${event}`);
        return { handled: false, event };
    }
  }

  private async handleSuccessfulPayment(data: PaymentWebhookPayload['data']) {
    const { reference, metadata, amount, status } = data;

    const payment = await prisma.payment.findFirst({
      where: { providerRef: reference },
    });

    if (!payment) {
      throw new AppError('Payment not found', 404);
    }

    if (payment.status === 'SUCCESS') {
      return { handled: true, message: 'Payment already processed' };
    }

    const userId = (metadata as any)?.userId || payment.userId;
    const planId = (metadata as any)?.planId || (payment.metadata as any)?.planId;

    // Update payment
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: 'SUCCESS',
        paidAt: new Date(),
        metadata: {
          ...((payment.metadata as object) || {}),
          paystackResponse: data,
        },
      },
    });

    // Create subscription
    const subscription = await subscriptionService.createSubscription(
      userId,
      planId,
      reference,
      true
    );

    // Update payment with subscription ID
    await prisma.payment.update({
      where: { id: payment.id },
      data: { subscriptionId: subscription.id },
    });

    logger.info(`Payment successful and subscription created for user ${userId}`);

    return { handled: true, subscriptionId: subscription.id };
  }

  private async handleFailedPayment(data: PaymentWebhookPayload['data']) {
    const { reference } = data;

    const payment = await prisma.payment.findFirst({
      where: { providerRef: reference },
    });

    if (payment) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'FAILED',
          metadata: {
            ...((payment.metadata as object) || {}),
            failureReason: data,
          },
        },
      });
    }

    return { handled: true, message: 'Payment marked as failed' };
  }

  private async handleSubscriptionCreated(data: PaymentWebhookPayload['data']) {
    logger.info('Paystack subscription created', data);
    return { handled: true };
  }

  private async handleSubscriptionDisabled(data: PaymentWebhookPayload['data']) {
    logger.info('Paystack subscription disabled', data);
    return { handled: true };
  }

  async verifyPayment(reference: string) {
    const verification = await paystackService.verifyTransaction(reference);

    if (verification.status === 'success') {
      return this.handleSuccessfulPayment({
        id: verification.id,
        reference: verification.reference,
        amount: verification.amount,
        currency: verification.currency,
        status: verification.status,
        metadata: verification.metadata,
        paid_at: verification.paid_at,
      });
    }

    return { handled: false, message: 'Payment not successful' };
  }

  async getUserPayments(userId: string) {
    return prisma.payment.findMany({
      where: { userId },
      include: {
        subscription: {
          include: { plan: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const paymentService = new PaymentService();