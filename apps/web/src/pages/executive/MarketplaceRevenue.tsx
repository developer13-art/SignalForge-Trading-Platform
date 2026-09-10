import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { MarketplaceIcon, DollarIcon } from '../../components/ui/icons';

export function MarketplaceRevenue() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Marketplace Revenue</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Revenue from provider marketplace</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total" value="$0.00" icon={<DollarIcon size={20} className="text-primary-600" />} />
        <StatCard label="This Month" value="$0.00" icon={<MarketplaceIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Commission" value="$0.00" icon={<DollarIcon size={20} className="text-purple-600" />} iconBg="bg-purple-100 dark:bg-purple-900/30" />
      </div>
    </div>
  );
}