import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { EmptyState } from '../../components/common/EmptyState';
import { TradingIcon } from '../../components/ui/icons';
import apiClient from '../../api/client';

export function OpenPositions() {
  const [positions, setPositions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/trading/positions').then((res: any) => setPositions(res.data || [])).catch(() => {}).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Open Positions</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Currently active trades on your broker accounts
        </p>
      </div>

      {positions.length > 0 ? (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Symbol</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Direction</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Volume</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Entry</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">P&L</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {positions.map((pos) => (
                  <tr key={pos.id}>
                    <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">{pos.symbol}</td>
                    <td className="px-6 py-3">
                      <Badge variant={pos.direction === 'BUY' ? 'success' : 'danger'}>{pos.direction}</Badge>
                    </td>
                    <td className="px-6 py-3 text-right text-gray-600 dark:text-gray-400">{pos.volume}</td>
                    <td className="px-6 py-3 text-right text-gray-600 dark:text-gray-400">{pos.entryPrice}</td>
                    <td className={`px-6 py-3 text-right font-medium ${(pos.realizedProfit || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {(pos.realizedProfit || 0) >= 0 ? '+' : ''}{(pos.realizedProfit || 0).toFixed(2)}
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
            icon={<TradingIcon size={32} className="text-gray-400" />}
            title="No Open Positions"
            description="Your active trades will appear here."
          />
        </Card>
      )}
    </div>
  );
}