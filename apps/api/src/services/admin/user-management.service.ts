import { prisma } from '../../config/database';

export class UserManagementService {
  async listUsers(search?: string, limit: number = 50) {
    return prisma.user.findMany({
      where: search ? {
        OR: [
          { email: { contains: search, mode: 'insensitive' } },
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
        ],
      } : {},
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getUser(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async updateUserStatus(id: string, status: string) {
    return prisma.user.update({
      where: { id },
      data: { status },
    });
  }
}

export const userManagementService = new UserManagementService();