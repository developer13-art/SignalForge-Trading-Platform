export enum BrokerPlatform {
  MT4 = 'MT4',
  MT5 = 'MT5',
}

export enum BrokerAccountType {
  DEMO = 'DEMO',
  LIVE = 'LIVE',
}

export enum BrokerAccountStatus {
  CONNECTED = 'CONNECTED',
  SYNCHRONIZING = 'SYNCHRONIZING',
  DISCONNECTED = 'DISCONNECTED',
  DEPLOYMENT_PENDING = 'DEPLOYMENT_PENDING',
  ERROR = 'ERROR',
}