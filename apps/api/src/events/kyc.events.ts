import { eventBus } from './event-bus';

export const kycEvents = {
  async applicationSubmitted(data: { userId: string; applicationId: string }) {
    await eventBus.publish('KycSubmitted', data, { userId: data.userId });
  },

  async applicationApproved(data: { userId: string; applicationId: string }) {
    await eventBus.publish('KycApproved', data, { userId: data.userId });
  },

  async applicationRejected(data: { userId: string; applicationId: string; reason: string }) {
    await eventBus.publish('KycRejected', data, { userId: data.userId });
  },
};

export default kycEvents;