import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { ArrowRightIcon } from '../../components/ui/icons';
import { tradeService, Trade } from '../../services/trade.service';

export function TradeHistory() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    tradeService.getHistory().then(setTrades).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trade History</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          All your past and present trades
        </p>
      </div>

      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Symbol</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Direction</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Volume</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">P&L</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {trades.map((t) => (
                <tr key={t.id}>
                  <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">{t.symbol}</td>
                  <td className="px-6 py-3">
                    <Badge variant={t.direction === 'BUY' ? 'success' : 'danger'}>{t.direction}</Badge>
                  </td>
                  <td className="px-6 py-3 text-right text-gray-600 dark:text-gray-400">{t.volume}</td>
                  <td className={`px-6 py-3 text-right font-medium ${t.realizedProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {t.realizedProfit >= 0 ? '+' : ''}{t.realizedProfit?.toFixed(2) || '0.00'}
                  </td>
                  <td className="px-6 py-3">
                    <Badge variant={t.status === 'OPEN' ? 'info' : 'neutral'}>{t.status}</Badge>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <Link to={`/trading/${t.id}`} className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-1">
                      View <ArrowRightIcon size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}