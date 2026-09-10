import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { EmptyState } from '../../components/common/EmptyState';
import { WalletIcon } from '../../components/ui/icons';
import apiClient from '../../api/client';

export function BillingHistory() {
  const [payments, setPayments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/subscriptions/payments').then((res: any) => setPayments(res.data || [])).catch(() => {}).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing History</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          All subscription payments
        </p>
      </div>

      {payments.length > 0 ? (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Reference</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td className="px-6 py-3 text-gray-600 dark:text-gray-400">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">
                      {p.providerRef}
                    </td>
                    <td className="px-6 py-3 text-right font-medium text-gray-900 dark:text-white">
                      ${p.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-3">
                      <Badge variant={p.status === 'SUCCESS' ? 'success' : 'warning'}>{p.status}</Badge>
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
            icon={<WalletIcon size={32} className="text-gray-400" />}
            title="No Billing History"
            description="Your payments will appear here."
          />
        </Card>
      )}
    </div>
  );
}