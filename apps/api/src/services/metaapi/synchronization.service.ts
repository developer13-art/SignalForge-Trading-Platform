import { metaApiClient } from '../../integrations/metaapi/client';
import { prisma } from '../../config/database';

export class SynchronizationService {
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
        leverage: info.leverage,
        currency: info.currency,
        status: 'CONNECTED',
        lastSyncAt: new Date(),
      },
    });

    return info;
  }
}

export const synchronizationService = new SynchronizationService();