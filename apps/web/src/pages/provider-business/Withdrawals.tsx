import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatCard } from '../../components/cards/StatCard';
import { WalletIcon, DollarIcon, PlusIcon } from '../../components/ui/icons';

export function Withdrawals() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Withdrawals</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Withdraw your earnings
          </p>
        </div>
        <Button>
          <PlusIcon size={18} /> New Withdrawal
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Available" value="$0.00" icon={<WalletIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Pending" value="$0.00" icon={<DollarIcon size={20} className="text-yellow-600" />} iconBg="bg-yellow-100 dark:bg-yellow-900/30" />
        <StatCard label="Withdrawn" value="$0.00" icon={<DollarIcon size={20} className="text-primary-600" />} />
      </div>
    </div>
  );
}