import { prisma } from '../../config/database';
import { KycVerificationResult } from '../../types/kyc.types';

export class VerificationService {
  async performVerification(applicationId: string): Promise<KycVerificationResult> {
    const application = await prisma.kycApplication.findUnique({
      where: { id: applicationId },
      include: {
        documents: true,
        user: true,
      },
    });

    if (!application) {
      throw new Error('Application not found');
    }

    // Perform automated checks
    const documentCheck = application.documents.length > 0;
    const identityCheck = true; // Would integrate with actual KYC provider
    const livenessCheck = true; // Would integrate with liveness provider
    const nameMatch = true; // Would compare document name with user name
    const dobMatch = true; // Would compare document DOB with user DOB

    const result: KycVerificationResult = {
      documentCheck,
      identityCheck,
      livenessCheck,
      nameMatch,
      dobMatch,
      result: documentCheck && identityCheck && livenessCheck ? 'PASS' : 'FAIL',
    };

    // Save verification result
    await prisma.kycVerification.create({
      data: {
        applicationId,
        documentCheck,
        identityCheck,
        livenessCheck,
        nameMatch,
        dobMatch,
        result: result.result,
      },
    });

    return result;
  }

  async getVerificationByApplication(applicationId: string) {
    return prisma.kycVerification.findMany({
      where: { applicationId },
      orderBy: { verifiedAt: 'desc' },
    });
  }
}

export const verificationService = new VerificationService();