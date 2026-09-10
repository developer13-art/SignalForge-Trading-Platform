import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { TraderIcon, AnalyticsIcon, RiskIcon, CheckIcon } from '../../components/ui/icons';

export function TraderIntelligence() {
  const traits = [
    { label: 'Consistency', value: 'High', variant: 'success' as const },
    { label: 'Discipline', value: 'High', variant: 'success' as const },
    { label: 'Martingale Detection', value: 'Not Detected', variant: 'success' as const },
    { label: 'Grid Trading', value: 'Not Detected', variant: 'success' as const },
    { label: 'Recovery Trading', value: 'Not Detected', variant: 'success' as const },
    { label: 'News Exposure', value: 'Low', variant: 'success' as const },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trader Intelligence</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          AI-powered trader analysis
        </p>
      </div>

      <Card>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center shrink-0">
            <TraderIcon size={24} className="text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Trader Profile Analysis</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Behavioral traits detected through AI analysis
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {traits.map((t) => (
            <div key={t.label} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <p className="text-xs text-gray-500 dark:text-gray-400">{t.label}</p>
              <div className="mt-2">
                <Badge variant={t.variant}>{t.value}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}