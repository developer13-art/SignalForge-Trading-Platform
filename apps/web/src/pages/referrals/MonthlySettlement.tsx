import React from 'react';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/common/EmptyState';
import { CheckIcon, ClockIcon } from '../../components/ui/icons';

const steps = [
  { label: 'Month End', description: 'All trades for the month are finalized' },
  { label: 'Freeze Period', description: 'Short window for any final adjustments' },
  { label: 'Calculate Eligible Profit', description: 'Gross profit - gross loss - eligible costs' },
  { label: 'Find Referrer', description: 'Match each referred user to their referrer' },
  { label: 'Calculate Reward', description: 'Apply the reward rate to eligible net profit' },
  { label: 'Fraud & Integrity Checks', description: 'Verify no manipulation or suspicious activity' },
  { label: 'Finalize & Credit', description: 'Rewards credited to wallet via ledger entry' },
];

export function MonthlySettlement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Monthly Settlement</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          How referral rewards are calculated and settled
        </p>
      </div>

      <Card>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                <CheckIcon size={16} className="text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{step.label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Next Settlement</h3>
        <div className="flex items-center gap-3">
          <ClockIcon size={20} className="text-primary-600" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleDateString()}
          </span>
        </div>
      </Card>
    </div>
  );
}