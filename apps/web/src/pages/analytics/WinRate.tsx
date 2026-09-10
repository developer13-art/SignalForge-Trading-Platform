import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';
import { Spinner } from '../../components/ui/Spinner';
import { analyticsService, PerformanceMetrics } from '../../services/analytics.service';

export function WinRate() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    analyticsService.getPerformance().then(setMetrics).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Win Rate</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Breakdown of winning vs losing trades
        </p>
      </div>

      <Card>
        <div className="text-center py-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">Overall Win Rate</p>
          <p className="text-5xl font-extrabold text-primary-600 dark:text-primary-400 mt-2">
            {(metrics?.winRate || 0).toFixed(1)}%
          </p>
          <Progress value={metrics?.winRate || 0} max={100} variant="success" className="mt-6 max-w-md mx-auto" />
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Trades</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{metrics?.totalTrades || 0}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Winning</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{metrics?.winningTrades || 0}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Losing</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{metrics?.losingTrades || 0}</p>
        </Card>
      </div>
    </div>
  );
}