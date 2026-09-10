import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Spinner } from '../../components/ui/Spinner';
import { SignalCard } from '../../components/cards/SignalCard';
import { EmptyState } from '../../components/common/EmptyState';
import { SignalIcon } from '../../components/ui/icons';
import { signalService, Signal } from '../../services/signal.service';

export function ActiveSignals() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    signalService.getLive().then(setSignals).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Active Signals</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Signals currently being processed
        </p>
      </div>

      {signals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {signals.map((signal) => (
            <SignalCard
              key={signal.id}
              symbol={signal.symbol || ''}
              direction={signal.direction as 'BUY' | 'SELL'}
              entryPrice={signal.entryPrice || undefined}
              stopLoss={signal.stopLoss || undefined}
              takeProfit={signal.takeProfit1 || undefined}
              confidence={signal.confidence || undefined}
              timestamp={signal.createdAt}
            />
          ))}
        </div>
      ) : (
        <Card>
          <EmptyState
            icon={<SignalIcon size={32} className="text-gray-400" />}
            title="No Active Signals"
            description="Connect a signal source to start receiving signals."
          />
        </Card>
      )}
    </div>
  );
}