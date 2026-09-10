import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { AnalyticsIcon, TraderIcon, RiskIcon, CheckIcon } from '../../components/ui/icons';

export function IntelligenceOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trader Intelligence Overview</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          AI-powered behavioral analysis
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Consistency Score" value="0%" icon={<AnalyticsIcon size={20} className="text-primary-600" />} />
        <StatCard label="Discipline Score" value="0%" icon={<CheckIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Risk Score" value="0" icon={<RiskIcon size={20} className="text-yellow-600" />} iconBg="bg-yellow-100 dark:bg-yellow-900/30" />
        <StatCard label="Style" value="Unknown" icon={<TraderIcon size={20} className="text-purple-600" />} iconBg="bg-purple-100 dark:bg-purple-900/30" />
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">What We Analyze</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            'Trade consistency',
            'Discipline patterns',
            'Risk management',
            'Martingale detection',
            'Grid trading detection',
            'Recovery trading',
            'News exposure',
            'Trading style',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="w-1.5 h-1.5 bg-primary-600 rounded-full" />
              {item}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}