import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { ArrowRightIcon, SignalIcon, ProviderIcon, TradingIcon, AnalyticsIcon } from '../../components/ui/icons';

const categories = [
  { id: 'forex', name: 'Forex Signals', count: 0, icon: SignalIcon },
  { id: 'crypto', name: 'Crypto Signals', count: 0, icon: TradingIcon },
  { id: 'indices', name: 'Indices', count: 0, icon: AnalyticsIcon },
  { id: 'commodities', name: 'Commodities', count: 0, icon: ProviderIcon },
  { id: 'education', name: 'Education', count: 0, icon: SignalIcon },
  { id: 'vip', name: 'VIP Premium', count: 0, icon: ProviderIcon },
];

export function ProviderCategories() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider Categories</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Browse providers by category
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link key={cat.id} to={`/marketplace/providers?category=${cat.id}`}>
              <Card hoverable>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{cat.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{cat.count} providers</p>
                  </div>
                  <ArrowRightIcon size={16} className="text-gray-400" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}