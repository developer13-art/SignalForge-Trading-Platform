import axios, { AxiosInstance } from 'axios';
import { metaApiConfig } from '../../config/metaapi';
import { logger } from '@signalforge/logger';

export class MetaApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: metaApiConfig.apiUrl,
      timeout: 30000,
      headers: metaApiConfig.getHeaders(),
    });
  }

  async createAccount(data: {
    login: string;
    password: string;
    server: string;
    platform: 'mt4' | 'mt5';
    name: string;
  }) {
    const response = await this.client.post('/users/current/accounts', {
      login: data.login,
      password: data.password,
      server: data.server,
      platform: data.platform,
      name: data.name,
      type: 'cloud',
      magic: 0,
    });

    return response.data;
  }

  async getAccount(accountId: string) {
    const response = await this.client.get(`/users/current/accounts/${accountId}`);
    return response.data;
  }

  async deleteAccount(accountId: string) {
    await this.client.delete(`/users/current/accounts/${accountId}`);
  }

  async deployAccount(accountId: string) {
    const response = await this.client.post(`/users/current/accounts/${accountId}/deploy`);
    return response.data;
  }

  async undeployAccount(accountId: string) {
    await this.client.post(`/users/current/accounts/${accountId}/undeploy`);
  }

  async getAccountInformation(accountId: string) {
    const response = await this.client.get(
      `/users/current/accounts/${accountId}/account-information`
    );
    return response.data;
  }

  async getPositions(accountId: string) {
    const response = await this.client.get(
      `/users/current/accounts/${accountId}/positions`
    );
    return response.data;
  }

  async getOrders(accountId: string) {
    const response = await this.client.get(
      `/users/current/accounts/${accountId}/orders`
    );
    return response.data;
  }

  async createMarketOrder(accountId: string, data: {
    symbol: string;
    volume: number;
    type: 'ORDER_TYPE_BUY' | 'ORDER_TYPE_SELL';
    stopLoss?: number;
    takeProfit?: number;
    comment?: string;
    magic?: number;
  }) {
    const response = await this.client.post(
      `/users/current/accounts/${accountId}/trade`,
      {
        symbol: data.symbol,
        volume: data.volume,
        type: data.type,
        stopLoss: data.stopLoss,
        takeProfit: data.takeProfit,
        comment: data.comment,
        magic: data.magic,
      }
    );

    return response.data;
  }

  async createPendingOrder(accountId: string, data: {
    symbol: string;
    volume: number;
    type: 'ORDER_TYPE_BUY_LIMIT' | 'ORDER_TYPE_SELL_LIMIT' | 'ORDER_TYPE_BUY_STOP' | 'ORDER_TYPE_SELL_STOP';
    openPrice: number;
    stopLoss?: number;
    takeProfit?: number;
    comment?: string;
  }) {
    const response = await this.client.post(
      `/users/current/accounts/${accountId}/trade`,
      data
    );

    return response.data;
  }

  async modifyPosition(accountId: string, positionId: string, data: {
    stopLoss?: number;
    takeProfit?: number;
  }) {
    const response = await this.client.put(
      `/users/current/accounts/${accountId}/positions/${positionId}`,
      data
    );

    return response.data;
  }

  async closePosition(accountId: string, positionId: string, volume?: number) {
    const response = await this.client.post(
      `/users/current/accounts/${accountId}/positions/${positionId}/close`,
      volume ? { volume } : {}
    );

    return response.data;
  }

  async closePositionsBySymbol(accountId: string, symbol: string) {
    const response = await this.client.post(
      `/users/current/accounts/${accountId}/positions/close-by-symbol`,
      { symbol }
    );

    return response.data;
  }

  async getSymbols(accountId: string) {
    const response = await this.client.get(
      `/users/current/accounts/${accountId}/symbols`
    );

    return response.data;
  }

  async getSymbolSpecification(accountId: string, symbol: string) {
    const response = await this.client.get(
      `/users/current/accounts/${accountId}/symbols/${symbol}/specification`
    );

    return response.data;
  }

  async getHistoricalPositions(accountId: string, startTime: string, endTime: string) {
    const response = await this.client.get(
      `/users/current/accounts/${accountId}/history-positions`,
      {
        params: {
          startTime,
          endTime,
        },
      }
    );

    return response.data;
  }
}

export const metaApiClient = new MetaApiClient();