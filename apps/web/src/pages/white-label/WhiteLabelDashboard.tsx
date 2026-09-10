import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { UsersIcon, DollarIcon, AnalyticsIcon, ProviderIcon } from '../../components/ui/icons';

export function WhiteLabelDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">White Label Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Overview of your white label platform
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Users" value="0" icon={<UsersIcon size={20} className="text-primary-600" />} />
        <StatCard label="Monthly Revenue" value="$0.00" icon={<DollarIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Active Providers" value="0" icon={<ProviderIcon size={20} className="text-purple-600" />} iconBg="bg-purple-100 dark:bg-purple-900/30" />
        <StatCard label="Growth" value="0%" icon={<AnalyticsIcon size={20} className="text-blue-600" />} iconBg="bg-blue-100 dark:bg-blue-900/30" />
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Getting Started</h3>
        <div className="space-y-3">
          {[
            'Configure your brand colors and logo',
            'Set up your custom domain',
            'Define your subscription pricing',
            'Import or invite providers',
            'Configure email templates',
          ].map((step, i) => (
            <div key={step} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center font-semibold shrink-0">
                {i + 1}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{step}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}