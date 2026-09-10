import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Spinner } from '../../components/ui/Spinner';
import { ArrowLeftIcon, UsersIcon, StarIcon } from '../../components/ui/icons';
import { marketplaceService, Trader } from '../../services/marketplace.service';

export function TraderProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trader, setTrader] = useState<Trader | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) marketplaceService.getTrader(id).then(setTrader).finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;
  if (!trader) return <div>Trader not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/marketplace/traders')} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trader Profile</h1>
      </div>

      <Card>
        <div className="flex items-start gap-6">
          <Avatar src={trader.avatarUrl} name={trader.displayName} size="xl" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{trader.displayName}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{trader.bio}</p>
            <div className="flex items-center gap-4 mt-4">
              {trader.rating !== undefined && (
                <div className="flex items-center gap-1">
                  <StarIcon size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{trader.rating.toFixed(1)}</span>
                </div>
              )}
              {trader.followerCount !== undefined && (
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <UsersIcon size={16} />
                  {trader.followerCount} followers
                </div>
              )}
            </div>
            <div className="mt-6 flex gap-3">
              <Button onClick={() => navigate(`/marketplace/traders/${id}/follow`)}>Follow</Button>
              <Button variant="outline" onClick={() => navigate(`/marketplace/traders/${id}/copy`)}>
                Copy Trading Settings
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Return</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {trader.monthlyReturn ? `${trader.monthlyReturn.toFixed(1)}%` : '-'}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Trades</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{trader.totalTrades ?? 0}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Win Rate</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {trader.winRate ? `${trader.winRate.toFixed(1)}%` : '-'}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Style</p>
          <div className="mt-1">
            <Badge variant="info">{trader.style || 'Unknown'}</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
}