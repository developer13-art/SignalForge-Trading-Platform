import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { SignalIcon, ArrowRightIcon, ClockIcon } from '../../components/ui/icons';
import { signalService, Signal } from '../../services/signal.service';
import { useWebSocket } from '../../hooks/useWebSocket';

export function LiveSignals() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { on } = useWebSocket();

  const loadSignals = () => {
    signalService.getLive().then(setSignals).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadSignals();
    const unsubscribe = on('signal:new', (signal) => {
      setSignals(prev => [signal, ...prev].slice(0, 50));
    });
    return unsubscribe;
  }, [on]);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Live Signals</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Real-time signal feed from your connected sources
          </p>
        </div>
        <Badge variant="success" dot>Live</Badge>
      </div>

      {signals.length > 0 ? (
        <div className="space-y-3">
          {signals.map((signal) => (
            <Card key={signal.id} hoverable>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    signal.direction === 'BUY'
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : 'bg-red-100 dark:bg-red-900/30'
                  }`}>
                    <SignalIcon size={24} className={
                      signal.direction === 'BUY' ? 'text-green-600' : 'text-red-600'
                    } />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-900 dark:text-white">{signal.symbol}</span>
                      <Badge variant={signal.direction === 'BUY' ? 'success' : 'danger'}>
                        {signal.direction}
                      </Badge>
                      {signal.confidence && (
                        <Badge variant="primary">{signal.confidence.toFixed(0)}%</Badge>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      {signal.entryPrice && <span>Entry: {signal.entryPrice}</span>}
                      {signal.stopLoss && <span>SL: {signal.stopLoss}</span>}
                      {signal.takeProfit1 && <span>TP: {signal.takeProfit1}</span>}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <ClockIcon size={12} />
                    {new Date(signal.createdAt).toLocaleTimeString()}
                  </div>
                  <Link to={`/signals/${signal.id}`}>
                    <Button variant="ghost" size="sm" className="mt-2">
                      Details <ArrowRightIcon size={14} />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="text-center py-12">
            <SignalIcon size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No live signals yet</p>
          </div>
        </Card>
      )}
    </div>
  );
}