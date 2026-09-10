import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { signalService, Signal } from '../../services/signal.service';

export function SignalHistory() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    signalService.getHistory().then(setSignals).finally(() => setIsLoading(false));
  }, []);

  const filtered = filter === 'ALL'
    ? signals
    : signals.filter(s => s.status === filter);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Signal History</h1>
        <div className="flex gap-2">
          {['ALL', 'VALIDATED', 'REJECTED', 'EXECUTED'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filter === f
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Symbol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Direction</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SL/TP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Confidence</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filtered.map(signal => (
                <tr key={signal.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{signal.symbol}</td>
                  <td className="px-6 py-4">
                    <Badge variant={signal.direction === 'BUY' ? 'success' : 'danger'}>
                      {signal.direction}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{signal.entryPrice || '-'}</td>
                  <td className="px-6 py-4 text-xs text-gray-600 dark:text-gray-400">
                    {signal.stopLoss || '-'} / {signal.takeProfit1 || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {signal.confidence ? `${signal.confidence.toFixed(0)}%` : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      signal.status === 'EXECUTED' ? 'success' :
                      signal.status === 'REJECTED' ? 'danger' : 'info'
                    }>
                      {signal.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400">
                    {new Date(signal.createdAt).toLocaleString()}
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