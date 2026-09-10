import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { ProviderIcon } from '../../components/ui/icons';

export function ProviderDNA() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider DNA</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Learn each provider's unique patterns
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<ProviderIcon size={32} className="text-gray-400" />}
          title="No Provider DNA Yet"
          description="Once you connect a signal provider, SignalForge will learn their patterns over time."
        />
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">How Provider DNA Works</h3>
        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 shrink-0" />
            <span><strong className="text-gray-900 dark:text-white">Fast Path:</strong> Known patterns are matched via regex without calling AI</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 shrink-0" />
            <span><strong className="text-gray-900 dark:text-white">Learning Path:</strong> Unfamiliar patterns fall back to full AI inference</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 shrink-0" />
            <span><strong className="text-gray-900 dark:text-white">Continuous Learning:</strong> New patterns update the DNA automatically</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 shrink-0" />
            <span><strong className="text-gray-900 dark:text-white">Per-Provider:</strong> Each provider has their own DNA profile</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}