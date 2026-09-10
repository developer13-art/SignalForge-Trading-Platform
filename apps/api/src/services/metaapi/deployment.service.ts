import { metaApiClient } from '../../integrations/metaapi/client';
import { logger } from '@signalforge/logger';

export class DeploymentService {
  async deploy(accountId: string) {
    logger.info(`Deploying MetaApi account ${accountId}`);
    return metaApiClient.deployAccount(accountId);
  }

  async undeploy(accountId: string) {
    await metaApiClient.undeployAccount(accountId);
  }
}

export const deploymentService = new DeploymentService();