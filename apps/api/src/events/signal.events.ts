import { eventBus } from './event-bus';
import { logger } from '@signalforge/logger';

export const signalEvents = {
  async signalReceived(data: { signalId: string; userId: string }) {
    await eventBus.publish('SignalReceived', data, { userId: data.userId });
  },

  async signalClassified(data: { signalId: string; classification: string; confidence: number }) {
    await eventBus.publish('SignalClassified', data);
  },

  async signalParsed(data: { signalId: string; parserType: string; confidence: number }) {
    await eventBus.publish('SignalParsed', data);
  },

  async signalValidated(data: { signalId: string; passed: boolean }) {
    await eventBus.publish('SignalValidated', data);
  },

  async providerDnaLearned(data: { providerId: string; patterns: number }) {
    await eventBus.publish('ProviderDNALearned', data);
  },
};

export default signalEvents;