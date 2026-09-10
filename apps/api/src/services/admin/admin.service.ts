import { prisma } from '../../config/database';
import { startOfDay, endOfDay, addDays } from '../../utils/date';

export class AdminService {
  async getOverview() {
    const today = new Date();
    const start = startOfDay(today);
    const thirtyDaysAgo = addDays(today, -30);

    const [
      totalUsers,
      activeUsers,
      newUsersToday,
      verifiedUsers,
      pendingKyc,
      totalProviders,
      totalTrades,
      tradesToday,
      activeSubscriptions,
      totalRevenue,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { status: 'ACTIVE' } }),
      prisma.user.count({ where: { createdAt: { gte: start } } }),
      prisma.user.count({ where: { kycStatus: 'VERIFIED' } }),
      prisma.kycApplication.count({ where: { status: { in: ['PENDING', 'UNDER_REVIEW'] } } }),
      prisma.provider.count(),
      prisma.trade.count(),
      prisma.trade.count({ where: { createdAt: { gte: start } } }),
      prisma.subscription.count({ where: { status: 'ACTIVE' } }),
      prisma.payment.aggregate({
        where: { status: 'SUCCESS' },
        _sum: { amount: true },
      }),
    ]);

    return {
      users: { total: totalUsers, active: activeUsers, newToday: newUsersToday, verified: verifiedUsers },
      kyc: { pending: pendingKyc },
      providers: { total: totalProviders },
      trades: { total: totalTrades, today: tradesToday },
      subscriptions: { active: activeSubscriptions },
      revenue: { total: totalRevenue._sum.amount || 0 },
    };
  }

  async getUsers(params: { page: number; limit: number; search?: string }) {
    const where: any = {};
    if (params.search) {
      where.OR = [
        { email: { contains: params.search, mode: 'insensitive' } },
        { firstName: { contains: params.search, mode: 'insensitive' } },
        { lastName: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true, email: true, firstName: true, lastName: true,
          status: true, kycStatus: true, accountType: true,
          createdAt: true, lastLoginAt: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: (params.page - 1) * params.limit,
        take: params.limit,
      }),
      prisma.user.count({ where }),
    ]);

    return { users, total };
  }

  async updateUserStatus(userId: string, status: string, adminId: string, reason?: string) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { status },
    });

    await prisma.auditLog.create({
      data: {
        actorId: adminId,
        action: 'USER_STATUS_UPDATED',
        resource: 'user',
        resourceId: userId,
        metadata: { status, reason } as any,
      },
    });

    return user;
  }

  async getAuditLogs(params: { page: number; limit: number; action?: string }) {
    const where: any = {};
    if (params.action) where.action = params.action;

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        include: {
          user: {
            select: { email: true, firstName: true, lastName: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (params.page - 1) * params.limit,
        take: params.limit,
      }),
      prisma.auditLog.count({ where }),
    ]);

    return { logs, total };
  }

  async getSystemHealth() {
    return {
      status: 'healthy',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: new Date().toISOString(),
    };
  }

  async getRevenueStats() {
    const thirtyDaysAgo = addDays(new Date(), -30);

    const [payments, subscriptions] = await Promise.all([
      prisma.payment.findMany({
        where: {
          status: 'SUCCESS',
          paidAt: { gte: thirtyDaysAgo },
        },
        select: { amount: true, paidAt: true },
      }),
      prisma.subscription.findMany({
        where: { status: 'ACTIVE' },
        include: { plan: true },
      }),
    ]);

    const dailyRevenue: Record<string, number> = {};
    payments.forEach(p => {
      if (p.paidAt) {
        const key = p.paidAt.toISOString().split('T')[0];
        dailyRevenue[key] = (dailyRevenue[key] || 0) + p.amount;
      }
    });

    const mrr = subscriptions.reduce((sum, s) => {
      return sum + (s.plan.period === 'MONTHLY' ? s.plan.price : s.plan.price / 12);
    }, 0);

    return {
      mrr,
      arr: mrr * 12,
      dailyRevenue: Object.entries(dailyRevenue).map(([date, amount]) => ({ date, amount })),
      totalActiveSubscriptions: subscriptions.length,
    };
  }
}

export const adminService = new AdminService();