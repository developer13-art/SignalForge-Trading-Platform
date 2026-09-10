import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Spinner } from '../../components/ui/Spinner';
import { adminService, AdminOverview } from '../../services/admin.service';
import {
  UsersIcon, TradingIcon, SubscriptionIcon, WalletIcon,
  KycIcon, ProviderIcon, AnalyticsIcon,
} from '../../components/ui/icons';

export function AdminDashboard() {
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    adminService.getOverview().then(setOverview).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;
  if (!overview) return null;

  const stats = [
    { label: 'Total Users', value: overview.users.total, sub: `${overview.users.active} active`, icon: UsersIcon, color: 'primary' },
    { label: 'New Today', value: overview.users.newToday, sub: 'signups', icon: UsersIcon, color: 'blue' },
    { label: 'KYC Verified', value: overview.users.verified, sub: `${overview.kyc.pending} pending`, icon: KycIcon, color: 'green' },
    { label: 'Providers', value: overview.providers.total, sub: 'total', icon: ProviderIcon, color: 'purple' },
    { label: 'Total Trades', value: overview.trades.total, sub: `${overview.trades.today} today`, icon: TradingIcon, color: 'orange' },
    { label: 'Active Subs', value: overview.subscriptions.active, sub: 'subscriptions', icon: SubscriptionIcon, color: 'teal' },
    { label: 'Revenue', value: `$${overview.revenue.total.toFixed(2)}`, sub: 'lifetime', icon: WalletIcon, color: 'green' },
    { label: 'Platform Health', value: 'Healthy', sub: 'all systems', icon: AnalyticsIcon, color: 'green' },
  ];

  const colorMap: Record<string, string> = {
    primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    teal: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Platform overview and metrics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.sub}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[stat.color]}`}>
                  <Icon size={20} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}