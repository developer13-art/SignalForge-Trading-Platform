import { Job } from 'bullmq';
import { createWorker, QUEUE_NAMES } from '../queues/queue';
import { verificationService } from '../services/kyc/verification.service';
import { prisma } from '../config/database';
import { logger } from '@signalforge/logger';

export function startKycWorker() {
  return createWorker(QUEUE_NAMES.KYC, async (job: Job) => {
    if (job.name === 'verify-application') {
      const { applicationId } = job.data;
      
      logger.info(`Running KYC verification for: ${applicationId}`);
      
      const result = await verificationService.performVerification(applicationId);
      
      // Auto-approve if all checks pass with high confidence
      if (result.result === 'PASS') {
        await prisma.kycApplication.update({
          where: { id: applicationId },
          data: {
            status: 'UNDER_REVIEW',
          },
        });
      }
      
      return result;
    }
    
    throw new Error(`Unknown job: ${job.name}`);
  });
}