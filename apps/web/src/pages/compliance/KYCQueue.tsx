import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { EmptyState } from '../../components/common/EmptyState';
import { KycIcon } from '../../components/ui/icons';
import apiClient from '../../api/client';

export function KYCQueue() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/compliance/kyc/queue').then((res: any) => setItems(res.data || [])).catch(() => {}).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">KYC Queue</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Applications awaiting review</p>
      </div>

      {items.length > 0 ? (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Submitted</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                      {item.user?.email}
                    </td>
                    <td className="px-6 py-3 text-gray-600 dark:text-gray-400">
                      {new Date(item.submittedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-3">
                      <Badge variant="warning">{item.status}</Badge>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <Button size="sm" variant="outline">Review</Button>
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
            icon={<KycIcon size={32} className="text-gray-400" />}
            title="Queue Empty"
            description="No KYC applications waiting for review."
          />
        </Card>
      )}
    </div>
  );
}