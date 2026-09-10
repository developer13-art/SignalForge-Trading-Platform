import { eventBus } from './event-bus';

export const referralEvents = {
  async rewardCreated(data: { referrerId: string; rewardId: string; amount: number }) {
    await eventBus.publish('ReferralRewardCreated', data, { userId: data.referrerId });
  },

  async rewardSettled(data: { referrerId: string; rewardId: string }) {
    await eventBus.publishToUser(data.referrerId, 'referral:settled', data);
  },
};

export default referralEvents;