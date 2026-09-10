import { useEffect, useState } from 'react';
import { marketplaceService, Provider, Trader } from '../services/marketplace.service';

export function useMarketplace() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [traders, setTraders] = useState<Trader[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      marketplaceService.getProviders(),
      marketplaceService.getTraders(),
    ]).then(([p, t]) => {
      setProviders(p);
      setTraders(t);
    }).catch(() => {}).finally(() => setIsLoading(false));
  }, []);

  return { providers, traders, isLoading };
}