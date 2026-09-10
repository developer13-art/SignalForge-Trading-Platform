import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { EmptyState } from '../../components/common/EmptyState';
import { ProviderCard } from '../../components/cards/ProviderCard';
import { ProviderIcon } from '../../components/ui/icons';
import { marketplaceService, Provider } from '../../services/marketplace.service';

export function MyProviders() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    marketplaceService.getMyProviders().then(setProviders).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Providers</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Providers you are subscribed to
        </p>
      </div>

      {providers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.map((p) => (
            <ProviderCard
              key={p.id}
              name={p.name}
              avatarUrl={p.logoUrl}
              description={p.description}
              isVerified={p.isVerified}
              rating={p.rating}
              subscribers={p.subscriberCount}
              monthlyReturn={p.monthlyReturn}
            />
          ))}
        </div>
      ) : (
        <Card>
          <EmptyState
            icon={<ProviderIcon size={32} className="text-gray-400" />}
            title="No Subscriptions"
            description="Browse providers to subscribe to your first one."
            action={{ label: 'Browse Providers', onClick: () => window.location.href = '/marketplace/providers' }}
          />
        </Card>
      )}
    </div>
  );
}