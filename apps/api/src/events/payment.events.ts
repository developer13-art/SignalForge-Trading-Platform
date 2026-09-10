import { eventBus } from './event-bus';

export const paymentEvents = {
  async paymentCompleted(data: { userId: string; paymentId: string; amount: number }) {
    await eventBus.publish('PaymentCompleted', data, { userId: data.userId });
  },

  async subscriptionCreated(data: { userId: string; subscriptionId: string }) {
    await eventBus.publish('SubscriptionCreated', data, { userId: data.userId });
  },
};

export default paymentEvents;