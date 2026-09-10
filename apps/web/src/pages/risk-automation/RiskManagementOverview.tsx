import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Progress } from '../../components/ui/Progress';
import { Spinner } from '../../components/ui/Spinner';
import {
  RiskIcon, ShieldIcon, AlertIcon, CheckIcon, AnalyticsIcon,
} from '../../components/ui/icons';
import { riskService, RiskProfile } from '../../services/risk.service';

export function RiskManagementOverview() {
  const [profile, setProfile] = useState<RiskProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    riskService.getProfile().then(setProfile).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  const toggles = [
    { key: 'trailingStop', label: 'Trailing Stop' },
    { key: 'breakEven', label: 'Break Even' },
    { key: 'profitLock', label: 'Profit Lock' },
    { key: 'partialClose', label: 'Partial Close' },
    { key: 'correlationProtection', label: 'Correlation Protection' },
    { key: 'newsFilter', label: 'News Filter' },
    { key: 'emergencyStop', label: 'Emergency Stop' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Management Overview</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Your complete risk configuration at a glance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center shrink-0">
              <RiskIcon size={20} className="text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Risk per Trade</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {profile?.riskPercent ?? 1}%
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center shrink-0">
              <AlertIcon size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Max Daily Loss</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {profile?.maxDailyLoss ?? 3}%
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center shrink-0">
              <ShieldIcon size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Max Drawdown</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {profile?.maxDrawdown ?? 10}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Protections</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {toggles.map((toggle) => {
            const enabled = profile ? (profile as any)[toggle.key] : false;
            return (
              <div key={toggle.key} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <span className="text-sm text-gray-700 dark:text-gray-300">{toggle.label}</span>
                <Badge variant={enabled ? 'success' : 'neutral'}>
                  {enabled ? 'ON' : 'OFF'}
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today's Risk Utilization</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Daily Loss</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">0% used</span>
            </div>
            <Progress value={0} max={100} variant="success" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Drawdown</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">0% used</span>
            </div>
            <Progress value={0} max={100} variant="success" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Open Trades</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                0 / {profile?.maxOpenTrades ?? 5}
              </span>
            </div>
            <Progress value={0} max={profile?.maxOpenTrades ?? 5} variant="primary" />
          </div>
        </div>
      </Card>
    </div>
  );
}