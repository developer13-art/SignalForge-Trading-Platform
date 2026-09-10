import { prisma } from '../../config/database';
import { metaApiClient } from '../../integrations/metaapi/client';
import { encrypt } from '../../utils/encryption';
import { logger } from '@signalforge/logger';

export class BrokerConnectionService {
  async connectBroker(userId: string, data: any) {
    const metaApiAccount = await metaApiClient.createAccount({
      login: data.loginNumber,
      password: data.password,
      server: data.server,
      platform: data.platform.toLowerCase(),
      name: data.nickname,
    });

    const account = await prisma.brokerAccount.create({
      data: {
        userId,
        brokerId: data.brokerId,
        platform: data.platform,
        server: data.server,
        loginNumber: encrypt(data.loginNumber),
        accountType: data.accountType,
        metaapiAccountId: metaApiAccount.id,
        nickname: data.nickname,
        status: 'DEPLOYMENT_PENDING',
      },
    });

    logger.info(`Broker account created: ${account.id}`);
    return account;
  }

  async disconnect(userId: string, accountId: string) {
    const account = await prisma.brokerAccount.findFirst({
      where: { id: accountId, userId },
    });
    if (!account) return;

    if (account.metaapiAccountId) {
      try {
        await metaApiClient.deleteAccount(account.metaapiAccountId);
      } catch {}
    }

    await prisma.brokerAccount.update({
      where: { id: accountId },
      data: { status: 'DISCONNECTED', metaapiAccountId: null },
    });
  }
}

export const brokerConnectionService = new BrokerConnectionService();