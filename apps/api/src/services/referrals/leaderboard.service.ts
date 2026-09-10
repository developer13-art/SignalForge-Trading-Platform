import { prisma } from '../../config/database';

export class ReferralLeaderboardService {
  async getLeaderboard(limit: number = 20) {
    const wallets = await prisma.referralWallet.findMany({
      orderBy: { lifetimeEarned: 'desc' },
      take: limit,
      include: {
        user: { select: { firstName: true, lastName: true, avatarUrl: true } },
      },
    });

    return wallets.map((w, i) => ({
      rank: i + 1,
      user: {
        name: `${w.user.firstName} ${w.user.lastName}`,
        avatarUrl: w.user.avatarUrl,
      },
      lifetimeEarned: w.lifetimeEarned,
    }));
  }
}

export const referralLeaderboardService = new ReferralLeaderboardService();