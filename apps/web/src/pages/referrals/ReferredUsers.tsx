import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { EmptyState } from '../../components/common/EmptyState';
import { UsersIcon } from '../../components/ui/icons';
import { referralService, ReferralDashboard } from '../../services/referral.service';

export function ReferredUsers() {
  const [data, setData] = useState<ReferralDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    referralService.getDashboard().then(setData).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  const users = data?.referredUsers || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Referred Users</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Users you've referred
        </p>
      </div>

      {users.length > 0 ? (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Joined</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {users.map((u: any) => (
                  <tr key={u.id}>
                    <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">{u.name}</td>
                    <td className="px-6 py-3 text-gray-600 dark:text-gray-400">{u.email}</td>
                    <td className="px-6 py-3 text-gray-600 dark:text-gray-400">
                      {new Date(u.joinedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      <Badge variant={u.kycStatus === 'VERIFIED' ? 'success' : 'warning'}>
                        {u.kycStatus}
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
            icon={<UsersIcon size={32} className="text-gray-400" />}
            title="No Referred Users"
            description="Share your referral link to get started."
          />
        </Card>
      )}
    </div>
  );
}