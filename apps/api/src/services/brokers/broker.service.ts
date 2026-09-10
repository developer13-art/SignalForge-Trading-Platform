import { prisma } from '../../config/database';
import { metaApiClient } from '../../integrations/metaapi/client';
import { AppError } from '../../middleware/error.middleware';
import { encrypt, decrypt } from '../../utils/encryption';
import { logger } from '@signalforge/logger';

export class BrokerService {
  async getBrokers() {
    return prisma.broker.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async connectBroker(userId: string, data: {
    brokerId: string;
    platform: string;
    server: string;
    loginNumber: string;
    password: string;
    accountType: string;
    nickname: string;
  }) {
    const broker = await prisma.broker.findUnique({
      where: { id: data.brokerId },
    });

    if (!broker) {
      throw new AppError('Broker not found', 404);
    }

    if (!metaApiClient) {
      throw new AppError('MetaApi not configured', 500);
    }

    // Create MetaApi account
    let metaApiAccount: any;
    try {
      metaApiAccount = await metaApiClient.createAccount({
        login: data.loginNumber,
        password: data.password,
        server: data.server,
        platform: data.platform.toLowerCase() as 'mt4' | 'mt5',
        name: data.nickname,
      });
    } catch (error: any) {
      logger.error('MetaApi account creation failed:', error.response?.data || error.message);
      throw new AppError('Failed to create MetaApi account', 500);
    }

    // Save broker account
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

    // Deploy account (async - don't fail if this is slow)
    metaApiClient.deployAccount(metaApiAccount.id).catch(error => {
      logger.error('Deploy failed:', error);
    });

    logger.info(`Broker account connected: ${account.id}`);

    return account;
  }

  async getUserAccounts(userId: string) {
    return prisma.brokerAccount.findMany({
      where: { userId },
      include: {
        broker: {
          select: { name: true, logoUrl: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAccountDetails(userId: string, accountId: string) {
    const account = await prisma.brokerAccount.findFirst({
      where: { id: accountId, userId },
      include: {
        broker: true,
        snapshots: {
          orderBy: { capturedAt: 'desc' },
          take: 100,
        },
      },
    });

    if (!account) {
      throw new AppError('Broker account not found', 404);
    }

    return account;
  }

  async disconnectAccount(userId: string, accountId: string) {
    const account = await prisma.brokerAccount.findFirst({
      where: { id: accountId, userId },
    });

    if (!account) {
      throw new AppError('Broker account not found', 404);
    }

    if (account.metaapiAccountId) {
      try {
        await metaApiClient.deleteAccount(account.metaapiAccountId);
      } catch (error) {
        logger.warn('MetaApi delete failed:', error);
      }
    }

    await prisma.brokerAccount.update({
      where: { id: accountId },
      data: {
        status: 'DISCONNECTED',
        metaapiAccountId: null,
      },
    });

    return { success: true };
  }

  async syncAccount(userId: string, accountId: string) {
    const account = await prisma.brokerAccount.findFirst({
      where: { id: accountId, userId },
    });

    if (!account || !account.metaapiAccountId) {
      throw new AppError('Account not connected', 404);
    }

    try {
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

      return { success: true, info };
    } catch (error: any) {
      await prisma.brokerAccount.update({
        where: { id: accountId },
        data: { status: 'ERROR' },
      });

      throw new AppError('Failed to sync account', 500);
    }
  }
}

export const brokerService = new BrokerService();