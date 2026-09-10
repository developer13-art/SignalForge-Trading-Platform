import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { PlusIcon, TrashIcon } from '../../components/ui/icons';
import toast from 'react-hot-toast';

export function SubscriptionPlans() {
  const handleSave = () => {
    toast.success('Plans saved');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Subscription Plans</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Create and manage your subscription plans
        </p>
      </div>

      <Card>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Plan Name" placeholder="e.g., Basic" />
            <Input label="Price (USD)" type="number" placeholder="29" />
            <Input label="Billing Period" placeholder="monthly" />
          </div>
          <div className="flex justify-between">
            <Button variant="outline">
              <PlusIcon size={18} /> Add Plan
            </Button>
            <Button onClick={handleSave}>Save Plans</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}