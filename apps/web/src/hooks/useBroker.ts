import { useEffect, useState } from 'react';
import { brokerService, BrokerAccount } from '../services/broker.service';

export function useBroker() {
  const [accounts, setAccounts] = useState<BrokerAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    brokerService.getAccounts().then(setAccounts).catch(() => {}).finally(() => setIsLoading(false));
  }, []);

  return { accounts, isLoading, refetch: () => brokerService.getAccounts().then(setAccounts) };
}