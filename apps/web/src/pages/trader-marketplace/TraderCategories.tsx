import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { ArrowRightIcon, TraderIcon, TradingIcon, AnalyticsIcon, ProviderIcon } from '../../components/ui/icons';

const categories = [
  { id: 'scalpers', name: 'Scalpers', count: 0, icon: TradingIcon },
  { id: 'day-traders', name: 'Day Traders', count: 0, icon: AnalyticsIcon },
  { id: 'swing', name: 'Swing Traders', count: 0, icon: ProviderIcon },
  { id: 'position', name: 'Position Traders', count: 0, icon: TraderIcon },
  { id: 'news', name: 'News Traders', count: 0, icon: AnalyticsIcon },
  { id: 'algo', name: 'Algorithmic', count: 0, icon: TradingIcon },
];

export function TraderCategories() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trader Categories</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Browse traders by trading style
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link key={cat.id} to={`/marketplace/traders?category=${cat.id}`}>
              <Card hoverable>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center shrink-0">
                    <Icon size={24} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{cat.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{cat.count} traders</p>
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