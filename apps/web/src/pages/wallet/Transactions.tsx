import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { EmptyState } from '../../components/common/EmptyState';
import { AnalyticsIcon } from '../../components/ui/icons';
import apiClient from '../../api/client';

export function Transactions() {
  const [txs, setTxs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/wallet/transactions').then((res: any) => setTxs(res.data || [])).catch(() => {}).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          All wallet transactions
        </p>
      </div>

      {txs.length > 0 ? (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {txs.map((tx) => (
                  <tr key={tx.id}>
                    <td className="px-6 py-3 text-gray-600 dark:text-gray-400">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 text-gray-700 dark:text-gray-300">{tx.type}</td>
                    <td className="px-6 py-3 text-gray-600 dark:text-gray-400">{tx.description}</td>
                    <td className={`px-6 py-3 text-right font-medium ${tx.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.amount >= 0 ? '+' : ''}${tx.amount?.toFixed(2)}
                    </td>
                    <td className="px-6 py-3">
                      <Badge variant={tx.status === 'SUCCESS' ? 'success' : 'warning'}>{tx.status}</Badge>
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
            icon={<AnalyticsIcon size={32} className="text-gray-400" />}
            title="No Transactions"
            description="Your transaction history will appear here."
          />
        </Card>
      )}
    </div>
  );
}