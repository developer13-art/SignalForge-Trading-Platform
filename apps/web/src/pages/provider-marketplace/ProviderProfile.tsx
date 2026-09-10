import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { Spinner } from '../../components/ui/Spinner';
import { ArrowLeftIcon, CheckIcon, StarIcon, UsersIcon } from '../../components/ui/icons';
import { marketplaceService, Provider } from '../../services/marketplace.service';

export function ProviderProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) marketplaceService.getProvider(id).then(setProvider).finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;
  if (!provider) return <div>Provider not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/marketplace/providers')} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider Profile</h1>
      </div>

      <Card>
        <div className="flex items-start gap-6">
          <Avatar src={provider.logoUrl} name={provider.name} size="xl" />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{provider.name}</h2>
              {provider.isVerified && <Badge variant="primary">Verified</Badge>}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{provider.description}</p>
            <div className="flex items-center gap-4 mt-4">
              {provider.rating !== undefined && (
                <div className="flex items-center gap-1">
                  <StarIcon size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{provider.rating.toFixed(1)}</span>
                </div>
              )}
              {provider.subscriberCount !== undefined && (
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <UsersIcon size={16} />
                  {provider.subscriberCount} subscribers
                </div>
              )}
            </div>
            <div className="mt-6 flex gap-3">
              <Button onClick={() => navigate(`/marketplace/providers/${id}/subscribe`)}>
                Subscribe
              </Button>
              <Button variant="outline" onClick={() => navigate(`/marketplace/providers/${id}/performance`)}>
                View Performance
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Return</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {provider.monthlyReturn ? `${provider.monthlyReturn.toFixed(1)}%` : '-'}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Signals</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {provider.totalSignals ?? 0}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Win Rate</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {provider.winRate ? `${provider.winRate.toFixed(1)}%` : '-'}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Max Drawdown</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {provider.maxDrawdown ? `${provider.maxDrawdown.toFixed(1)}%` : '-'}
          </p>
        </Card>
      </div>
    </div>
  );
}