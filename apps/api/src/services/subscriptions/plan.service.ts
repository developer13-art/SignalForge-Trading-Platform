import { prisma } from '../../config/database';
import { AppError } from '../../middleware/error.middleware';

export class PlanService {
  async getAllPlans(includeInactive: boolean = false) {
    return prisma.subscriptionPlan.findMany({
      where: includeInactive ? {} : { isActive: true },
      orderBy: { price: 'asc' },
    });
  }

  async getPlanById(planId: string) {
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      throw new AppError('Plan not found', 404);
    }

    return plan;
  }

  async createPlan(data: {
    name: string;
    description?: string;
    price: number;
    period: string;
    features?: Record<string, unknown>;
    isActive?: boolean;
  }) {
    const existing = await prisma.subscriptionPlan.findFirst({
      where: { name: data.name },
    });

    if (existing) {
      throw new AppError('Plan with this name already exists', 409);
    }

    return prisma.subscriptionPlan.create({
      data,
    });
  }

  async updatePlan(planId: string, data: Partial<{
    name: string;
    description: string;
    price: number;
    period: string;
    features: Record<string, unknown>;
    isActive: boolean;
  }>) {
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      throw new AppError('Plan not found', 404);
    }

    return prisma.subscriptionPlan.update({
      where: { id: planId },
      data,
    });
  }

  async deletePlan(planId: string) {
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      throw new AppError('Plan not found', 404);
    }

    // Soft delete - just deactivate
    return prisma.subscriptionPlan.update({
      where: { id: planId },
      data: { isActive: false },
    });
  }
}

export const planService = new PlanService();