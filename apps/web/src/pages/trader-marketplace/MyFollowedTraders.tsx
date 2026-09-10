import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { EmptyState } from '../../components/common/EmptyState';
import { TraderIcon } from '../../components/ui/icons';
import { marketplaceService, Trader } from '../../services/marketplace.service';

export function MyFollowedTraders() {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    marketplaceService.getMyFollowedTraders().then(setTraders).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Followed Traders</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Traders you are following or copying
        </p>
      </div>

      {traders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {traders.map((t) => (
            <Card key={t.id} hoverable>
              <div className="flex items-start gap-3">
                <Avatar src={t.avatarUrl} name={t.displayName} size="lg" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">{t.displayName}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{t.bio}</p>
                  <div className="mt-2">
                    <Badge variant={t.isCopying ? 'success' : 'neutral'}>
                      {t.isCopying ? 'Copy Trading' : 'Following'}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <EmptyState
            icon={<TraderIcon size={32} className="text-gray-400" />}
            title="Not Following Anyone"
            description="Browse traders to follow your first one."
            action={{ label: 'Browse Traders', onClick: () => window.location.href = '/marketplace/traders' }}
          />
        </Card>
      )}
    </div>
  );
}