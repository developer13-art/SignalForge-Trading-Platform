import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { EquityCurve as EquityCurveChart } from '../../components/charts';
import { Spinner } from '../../components/ui/Spinner';
import { analyticsService } from '../../services/analytics.service';

export function EquityCurve() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    analyticsService.getEquityCurve(30).then(setData).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Equity Curve</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Track your account equity and balance over time
        </p>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Last 30 Days</h3>
        {data.length > 0 ? (
          <EquityCurveChart data={data} />
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
            No equity data yet
          </div>
        )}
      </Card>
    </div>
  );
}