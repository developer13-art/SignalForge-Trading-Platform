import { prisma } from '../../config/database';

export class SecurityService {
  async getAuditLogs(limit: number = 100) {
    return prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async logAction(actorId: string, action: string, resource: string, metadata?: any) {
    return prisma.auditLog.create({
      data: { actorId, action, resource, metadata },
    });
  }
}

export const securityService = new SecurityService();