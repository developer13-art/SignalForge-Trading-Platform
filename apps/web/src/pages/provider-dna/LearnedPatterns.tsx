import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { AiIcon } from '../../components/ui/icons';

export function LearnedPatterns() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Learned Patterns</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          All patterns learned by AI from provider messages
        </p>
      </div>

      <Card>
        <EmptyState
          icon={<AiIcon size={32} className="text-gray-400" />}
          title="No Patterns Learned Yet"
          description="Patterns appear as the AI encounters them in real provider messages."
        />
      </Card>
    </div>
  );
}