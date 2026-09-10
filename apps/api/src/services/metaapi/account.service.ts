import { metaApiClient } from '../../integrations/metaapi/client';
import { prisma } from '../../config/database';
import { encrypt } from '../../utils/encryption';

export class MetaApiAccountService {
  async createAccount(data: {
    login: string;
    password: string;
    server: string;
    platform: 'mt4' | 'mt5';
    name: string;
  }) {
    return metaApiClient.createAccount(data);
  }

  async deleteAccount(accountId: string) {
    await metaApiClient.deleteAccount(accountId);
  }

  async getAccountInfo(accountId: string) {
    return metaApiClient.getAccountInformation(accountId);
  }
}

export const metaApiAccountService = new MetaApiAccountService();