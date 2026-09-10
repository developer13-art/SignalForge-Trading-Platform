import { prisma } from '../../config/database';
import { AppError } from '../../middleware/error.middleware';
import { encrypt } from '../../utils/encryption';

export class DocumentService {
  async createDocumentType(name: string, description?: string) {
    const existing = await prisma.kycDocumentType.findUnique({
      where: { name },
    });

    if (existing) {
      throw new AppError('Document type already exists', 409);
    }

    return prisma.kycDocumentType.create({
      data: {
        name,
        description,
      },
    });
  }

  async updateDocumentType(id: string, data: { name?: string; description?: string; isActive?: boolean }) {
    const documentType = await prisma.kycDocumentType.findUnique({
      where: { id },
    });

    if (!documentType) {
      throw new AppError('Document type not found', 404);
    }

    return prisma.kycDocumentType.update({
      where: { id },
      data,
    });
  }

  async getAllDocumentTypes(includeInactive: boolean = false) {
    return prisma.kycDocumentType.findMany({
      where: includeInactive ? {} : { isActive: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getDocumentById(documentId: string) {
    return prisma.kycDocument.findUnique({
      where: { id: documentId },
      include: {
        application: true,
        documentType: true,
      },
    });
  }

  async getDocumentsByApplication(applicationId: string) {
    return prisma.kycDocument.findMany({
      where: { applicationId },
      include: {
        documentType: true,
      },
    });
  }

  async deleteDocument(documentId: string) {
    const document = await prisma.kycDocument.findUnique({
      where: { id: documentId },
    });

    if (!document) {
      throw new AppError('Document not found', 404);
    }

    return prisma.kycDocument.delete({
      where: { id: documentId },
    });
  }
}

export const documentService = new DocumentService();