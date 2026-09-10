import { prisma } from '../../config/database';
import { metaApiClient } from '../../integrations/metaapi/client';
import { logger } from '@signalforge/logger';

export class BrokerSyncService {
  async syncAccount(accountId: string) {
    const account = await prisma.brokerAccount.findUnique({
      where: { id: accountId },
    });
    if (!account?.metaapiAccountId) return;

    const info = await metaApiClient.getAccountInformation(account.metaapiAccountId);

    await prisma.brokerAccount.update({
      where: { id: accountId },
      data: {
        balance: info.balance,
        equity: info.equity,
        margin: info.margin,
        freeMargin: info.freeMargin,
        lastSyncAt: new Date(),
      },
    });

    await prisma.accountSnapshot.create({
      data: {
        brokerAccountId: accountId,
        balance: info.balance,
        equity: info.equity,
        margin: info.margin,
        freeMargin: info.freeMargin,
        openPositions: 0,
      },
    });

    return info;
  }

  async syncAllAccounts() {
    const accounts = await prisma.brokerAccount.findMany({
      where: { status: 'CONNECTED' },
    });

    for (const account of accounts) {
      try {
        await this.syncAccount(account.id);
      } catch (error) {
        logger.error(`Sync failed for account ${account.id}:`, error);
      }
    }
  }
}

export const brokerSyncService = new BrokerSyncService();