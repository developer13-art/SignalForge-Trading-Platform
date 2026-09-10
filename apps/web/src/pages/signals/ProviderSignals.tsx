import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { ProviderIcon, SignalIcon } from '../../components/ui/icons';
import { signalService, Signal } from '../../services/signal.service';

export function ProviderSignals() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    signalService.getHistory().then(setSignals).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  // Group signals by symbol as a proxy for provider
  const groupedBySymbol = signals.reduce((acc, s) => {
    const key = s.symbol || 'Unknown';
    if (!acc[key]) acc[key] = [];
    acc[key].push(s);
    return acc;
  }, {} as Record<string, Signal[]>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider Signals</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Signals grouped by provider/symbol
        </p>
      </div>

      {Object.keys(groupedBySymbol).length > 0 ? (
        <div className="space-y-4">
          {Object.entries(groupedBySymbol).map(([symbol, symSignals]) => (
            <Card key={symbol}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                    <ProviderIcon size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{symbol}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{symSignals.length} signals</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {symSignals.slice(0, 5).map((s) => (
                  <Link
                    key={s.id}
                    to={`/signals/${s.id}`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant={s.direction === 'BUY' ? 'success' : 'danger'}>{s.direction}</Badge>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {s.confidence ? `${Math.round(s.confidence * 100)}%` : '-'}
                    </span>
                  </Link>
                ))}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <SignalIcon size={48} className="mx-auto mb-4 text-gray-400" />
            No signals yet
          </div>
        </Card>
      )}
    </div>
  );
}