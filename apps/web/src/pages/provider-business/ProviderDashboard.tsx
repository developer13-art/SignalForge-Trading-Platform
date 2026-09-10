import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { ProviderIcon, UsersIcon, DollarIcon, SignalIcon, TrendingUpIcon } from '../../components/ui/icons';

export function ProviderDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Overview of your provider business
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Subscribers" value="0" icon={<UsersIcon size={20} className="text-primary-600" />} />
        <StatCard label="Monthly Revenue" value="$0.00" icon={<DollarIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Signals Sent" value="0" icon={<SignalIcon size={20} className="text-blue-600" />} iconBg="bg-blue-100 dark:bg-blue-900/30" />
        <StatCard label="Win Rate" value="0%" icon={<TrendingUpIcon size={20} className="text-purple-600" />} iconBg="bg-purple-100 dark:bg-purple-900/30" />
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Getting Started</h3>
        <div className="space-y-3">
          {[
            'Complete your provider profile',
            'Set up your subscription plans',
            'Connect your signal source',
            'Complete provider certification',
            'Invite your first subscribers',
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