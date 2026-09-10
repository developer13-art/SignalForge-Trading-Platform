import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Spinner } from '../../components/ui/Spinner';
import { EmptyState } from '../../components/common/EmptyState';
import { TrendingUpIcon } from '../../components/ui/icons';
import { referralService } from '../../services/referral.service';

export function ReferralLeaderboard() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    referralService.getLeaderboard(20).then(setLeaders).catch(() => {}).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Referral Leaderboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Top referrers on SignalForge
        </p>
      </div>

      {leaders.length > 0 ? (
        <Card padding="none">
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {leaders.map((leader, i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <span className="w-8 text-center text-lg font-bold text-gray-400">
                  {i + 1}
                </span>
                <Avatar name={leader.user?.name} src={leader.user?.avatarUrl} size="md" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{leader.user?.name}</p>
                </div>
                <span className="font-semibold text-primary-600">
                  ${leader.lifetimeEarned?.toFixed(2) || '0.00'}
                </span>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <Card>
          <EmptyState
            icon={<TrendingUpIcon size={32} className="text-gray-400" />}
            title="Leaderboard Coming Soon"
            description="Top referrers will appear here."
          />
        </Card>
      )}
    </div>
  );
}