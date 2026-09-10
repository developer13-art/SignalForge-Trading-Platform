import { queues, QUEUE_NAMES } from './queue';

export const kycQueue = {
  async addVerification(applicationId: string) {
    return queues[QUEUE_NAMES.KYC].add('verify-application', { applicationId }, {
      jobId: `kyc-verify-${applicationId}`,
    });
  },
};