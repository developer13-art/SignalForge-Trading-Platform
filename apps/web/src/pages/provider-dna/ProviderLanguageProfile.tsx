import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { KycIcon } from '../../components/ui/icons';

export function ProviderLanguageProfile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Provider Language Profile</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Detected language and communication patterns per provider
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<KycIcon size={32} className="text-gray-400" />}
          title="No Language Profile"
          description="Connect a provider to build their language profile."
        />
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">What We Detect</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            'Primary language',
            'Secondary languages',
            'Formal vs informal tone',
            'Signal format style',
            'Timing patterns',
            'Message length patterns',
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