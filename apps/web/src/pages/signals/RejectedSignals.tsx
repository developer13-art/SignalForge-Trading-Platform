import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { EmptyState } from '../../components/common/EmptyState';
import { AlertIcon, ArrowRightIcon } from '../../components/ui/icons';
import { signalService, Signal } from '../../services/signal.service';

export function RejectedSignals() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    signalService.getHistory().then((data) => {
      setSignals(data.filter((s: Signal) => s.status === 'REJECTED'));
    }).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Rejected Signals</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Signals that failed risk validation
        </p>
      </div>

      {signals.length > 0 ? (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Symbol</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Direction</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Confidence</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Rejected At</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {signals.map((s) => (
                  <tr key={s.id}>
                    <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">{s.symbol}</td>
                    <td className="px-6 py-3">
                      <Badge variant={s.direction === 'BUY' ? 'success' : 'danger'}>{s.direction}</Badge>
                    </td>
                    <td className="px-6 py-3 text-gray-600 dark:text-gray-400">
                      {s.confidence ? `${Math.round(s.confidence * 100)}%` : '-'}
                    </td>
                    <td className="px-6 py-3 text-gray-600 dark:text-gray-400">
                      {new Date(s.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <Link to={`/signals/${s.id}`} className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-1">
                        View <ArrowRightIcon size={14} />
                      </Link>
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
            icon={<AlertIcon size={32} className="text-gray-400" />}
            title="No Rejected Signals"
            description="All signals have passed validation so far."
          />
        </Card>
      )}
    </div>
  );
}