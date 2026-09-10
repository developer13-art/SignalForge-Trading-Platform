import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { EmptyState } from '../../components/common/EmptyState';
import { AuditIcon } from '../../components/ui/icons';
import { referralService } from '../../services/referral.service';

export function RewardHistory() {
  const [rewards, setRewards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    referralService.getRewards().then(setRewards).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reward History</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Complete history of all referral rewards
        </p>
      </div>

      {rewards.length > 0 ? (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Eligible Profit</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Rate</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Reward</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {rewards.map((r) => (
                  <tr key={r.id}>
                    <td className="px-6 py-3 text-gray-600 dark:text-gray-400">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 text-right text-gray-600 dark:text-gray-400">
                      ${(r.eligibleNetProfit || 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-3 text-right text-gray-600 dark:text-gray-400">
                      {(r.rewardRate * 100).toFixed(2)}%
                    </td>
                    <td className="px-6 py-3 text-right font-medium text-gray-900 dark:text-white">
                      ${(r.rewardAmount || 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-3">
                      <Badge variant={
                        r.status === 'SETTLED' ? 'success' :
                        r.status === 'APPROVED' ? 'info' :
                        r.status === 'REJECTED' ? 'danger' : 'warning'
                      }>
                        {r.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <Card>
          <EmptyState
            icon={<AuditIcon size={32} className="text-gray-400" />}
            title="No Rewards Yet"
            description="Reward history will appear once your referrals generate eligible profit."
          />
        </Card>
      )}
    </div>
  );
}