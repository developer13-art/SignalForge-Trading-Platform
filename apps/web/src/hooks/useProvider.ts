import { useEffect, useState } from 'react';
import { marketplaceService, Provider } from '../services/marketplace.service';

export function useProvider(providerId?: string) {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (providerId) {
      marketplaceService.getProvider(providerId).then(setProvider).catch(() => {}).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [providerId]);

  return { provider, isLoading };
}