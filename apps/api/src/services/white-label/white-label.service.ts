import { prisma } from '../../config/database';

export class WhiteLabelService {
  async list() {
    return prisma.whiteLabelProject.findMany();
  }

  async getById(id: string) {
    return prisma.whiteLabelProject.findUnique({ where: { id } });
  }

  async create(data: any) {
    return prisma.whiteLabelProject.create({ data });
  }

  async update(id: string, data: any) {
    return prisma.whiteLabelProject.update({ where: { id }, data });
  }
}

export const whiteLabelService = new WhiteLabelService();