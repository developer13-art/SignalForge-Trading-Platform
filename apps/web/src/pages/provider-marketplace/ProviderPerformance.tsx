import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { Spinner } from '../../components/ui/Spinner';
import { TrendingUpIcon, TrendingDownIcon, AnalyticsIcon, DollarIcon } from '../../components/ui/icons';

export function ProviderPerformance() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 300);
  }, [id]);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider Performance</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Detailed performance metrics
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Return" value="0%" icon={<DollarIcon size={20} className="text-primary-600" />} />
        <StatCard label="Win Rate" value="0%" icon={<TrendingUpIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Max Drawdown" value="0%" icon={<TrendingDownIcon size={20} className="text-red-600" />} iconBg="bg-red-100 dark:bg-red-900/30" />
        <StatCard label="Sharpe Ratio" value="0.00" icon={<AnalyticsIcon size={20} className="text-purple-600" />} iconBg="bg-purple-100 dark:bg-purple-900/30" />
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Chart</h3>
        <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
          Provider performance chart will appear here
        </div>
      </Card>
    </div>
  );
}