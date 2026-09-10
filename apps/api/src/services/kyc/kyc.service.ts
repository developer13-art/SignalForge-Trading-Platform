import { prisma } from '../../config/database';
import { AppError } from '../../middleware/error.middleware';
import { logger } from '@signalforge/logger';
import { KycPersonalInfoRequest } from '../../types/kyc.types';

export class KycService {
  async getStatus(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { kycStatus: true },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const application = await prisma.kycApplication.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        documents: true,
        verifications: true,
      },
    });

    const documentTypes = await prisma.kycDocumentType.findMany({
      where: { isActive: true },
    });

    return {
      status: user.kycStatus,
      applicationId: application?.id,
      submittedAt: application?.submittedAt,
      verifiedAt: application?.verifiedAt,
      rejectionReason: application?.rejectionReason,
      documentTypes,
      documents: application?.documents || [],
      verifications: application?.verifications || [],
    };
  }

  async startApplication(userId: string) {
    // Check if user already has a pending or verified application
    const existingApplication = await prisma.kycApplication.findFirst({
      where: {
        userId,
        status: { in: ['PENDING', 'UNDER_REVIEW'] },
      },
    });

    if (existingApplication) {
      throw new AppError('You already have a KYC application in progress', 409);
    }

    // Create new application
    const application = await prisma.kycApplication.create({
      data: {
        userId,
        status: 'PENDING',
      },
    });

    // Update user KYC status
    await prisma.user.update({
      where: { id: userId },
      data: { kycStatus: 'PENDING' },
    });

    logger.info(`KYC application started for user: ${userId}`);

    return application;
  }

  async submitPersonalInfo(userId: string, data: KycPersonalInfoRequest) {
    const application = await prisma.kycApplication.findFirst({
      where: {
        userId,
        status: 'PENDING',
      },
    });

    if (!application) {
      throw new AppError('No pending KYC application found', 404);
    }

    // Update user profile with personal info
    await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phoneNumber,
      },
    });

    await prisma.userProfile.update({
      where: { userId },
      data: {
        country: data.countryOfResidence,
        address: data.address,
      },
    });

    return { applicationId: application.id };
  }

  async uploadDocument(userId: string, applicationId: string, documentTypeId: string, documentNumber: string | undefined, file: Express.Multer.File) {
    const application = await prisma.kycApplication.findFirst({
      where: {
        id: applicationId,
        userId,
        status: 'PENDING',
      },
    });

    if (!application) {
      throw new AppError('No pending KYC application found', 404);
    }

    const documentType = await prisma.kycDocumentType.findUnique({
      where: { id: documentTypeId },
    });

    if (!documentType || !documentType.isActive) {
      throw new AppError('Invalid or inactive document type', 400);
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new AppError('Invalid file type. Only JPG, JPEG, PNG, and PDF are allowed.', 400);
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      throw new AppError('File size exceeds 10MB limit', 400);
    }

    // In production, upload to S3 and store the key
    // For now, store the file reference
    const storageKey = `kyc/${userId}/${applicationId}/${Date.now()}_${file.originalname}`;

    const document = await prisma.kycDocument.create({
      data: {
        applicationId,
        documentTypeId,
        documentNumber,
        storageKey,
        fileName: file.originalname,
        fileType: file.mimetype,
        fileSize: file.size,
      },
    });

    return document;
  }

  async submitForReview(userId: string, applicationId: string) {
    const application = await prisma.kycApplication.findFirst({
      where: {
        id: applicationId,
        userId,
        status: 'PENDING',
      },
      include: {
        documents: true,
      },
    });

    if (!application) {
      throw new AppError('No pending KYC application found', 404);
    }

    if (application.documents.length === 0) {
      throw new AppError('At least one identity document is required', 400);
    }

    // Update application status
    await prisma.kycApplication.update({
      where: { id: applicationId },
      data: {
        status: 'UNDER_REVIEW',
        submittedAt: new Date(),
      },
    });

    // Update user KYC status
    await prisma.user.update({
      where: { id: userId },
      data: { kycStatus: 'UNDER_REVIEW' },
    });

    // Create audit log
    await prisma.kycAuditLog.create({
      data: {
        actorId: userId,
        action: 'SUBMITTED_FOR_REVIEW',
        oldStatus: 'PENDING',
        newStatus: 'UNDER_REVIEW',
      },
    });

    logger.info(`KYC application submitted for review: ${applicationId}`);

    return { status: 'UNDER_REVIEW' };
  }

  async reviewApplication(applicationId: string, reviewerId: string, status: 'APPROVED' | 'REJECTED', rejectionReason?: string, reviewNotes?: string) {
    const application = await prisma.kycApplication.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      throw new AppError('KYC application not found', 404);
    }

    if (application.status !== 'UNDER_REVIEW') {
      throw new AppError('Application is not under review', 400);
    }

    const newStatus = status === 'APPROVED' ? 'VERIFIED' : 'REJECTED';

    await prisma.kycApplication.update({
      where: { id: applicationId },
      data: {
        status: newStatus,
        reviewedAt: new Date(),
        verifiedAt: status === 'APPROVED' ? new Date() : null,
        rejectionReason: status === 'REJECTED' ? rejectionReason : null,
        reviewNotes,
      },
    });

    await prisma.user.update({
      where: { id: application.userId },
      data: { kycStatus: newStatus },
    });

    await prisma.kycAuditLog.create({
      data: {
        actorId: reviewerId,
        action: status === 'APPROVED' ? 'APPROVED' : 'REJECTED',
        oldStatus: 'UNDER_REVIEW',
        newStatus,
        reason: rejectionReason || reviewNotes,
      },
    });

    logger.info(`KYC application ${applicationId} ${status.toLowerCase()}`);

    return { status: newStatus };
  }

  async resubmit(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.kycStatus !== 'REJECTED') {
      throw new AppError('No rejected KYC application to resubmit', 400);
    }

    const oldApplication = await prisma.kycApplication.findFirst({
      where: {
        userId,
        status: 'REJECTED',
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!oldApplication) {
      throw new AppError('No rejected KYC application found', 404);
    }

    // Create new application
    const application = await prisma.kycApplication.create({
      data: {
        userId,
        status: 'PENDING',
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { kycStatus: 'PENDING' },
    });

    return application;
  }
}

export const kycService = new KycService();