import { metaApiClient } from './client';

export const metaApiAccount = {
  create: (data: any) => metaApiClient.createAccount(data),
  get: (id: string) => metaApiClient.getAccount(id),
  delete: (id: string) => metaApiClient.deleteAccount(id),
  deploy: (id: string) => metaApiClient.deployAccount(id),
  undeploy: (id: string) => metaApiClient.undeployAccount(id),
  getInfo: (id: string) => metaApiClient.getAccountInformation(id),
};

export default metaApiAccount;