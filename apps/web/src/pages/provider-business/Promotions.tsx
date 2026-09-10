import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { DollarIcon, PlusIcon } from '../../components/ui/icons';

export function Promotions() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Promotions</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Create discounts and special offers
          </p>
        </div>
        <Button>
          <PlusIcon size={18} /> Create Promotion
        </Button>
      </div>

      <Card>
        <EmptyState
          icon={<DollarIcon size={32} className="text-gray-400" />}
          title="No Promotions"
          description="Run promotions to attract subscribers."
        />
      </Card>
    </div>
  );
}