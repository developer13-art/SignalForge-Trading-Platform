import React from 'react';
import { Card } from '../ui/Card';
import { TrendingUpIcon, TrendingDownIcon } from '../ui/icons';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  change?: number;
  icon?: React.ReactNode;
  iconBg?: string;
}

export function StatCard({ label, value, subValue, change, icon, iconBg }: StatCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1 truncate">{value}</p>
          {(subValue || change !== undefined) && (
            <div className="flex items-center gap-2 mt-1">
              {change !== undefined && (
                <span className={`flex items-center gap-0.5 text-xs font-medium ${
                  change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {change >= 0 ? <TrendingUpIcon size={12} /> : <TrendingDownIcon size={12} />}
                  {Math.abs(change).toFixed(2)}%
                </span>
              )}
              {subValue && <span className="text-xs text-gray-500 dark:text-gray-400">{subValue}</span>}
            </div>
          )}
        </div>
        {icon && (
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${iconBg || 'bg-primary-100 dark:bg-primary-900/30'}`}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}