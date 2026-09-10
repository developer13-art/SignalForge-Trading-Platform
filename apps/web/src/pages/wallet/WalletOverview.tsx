import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { WalletIcon, DollarIcon, ClockIcon, PlusIcon } from '../../components/ui/icons';
import { Button } from '../../components/ui/Button';

export function WalletOverview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Wallet</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Your SignalForge wallet for subscriptions and rewards
          </p>
        </div>
        <Button>
          <PlusIcon size={18} /> Add Funds
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Available Balance" value="$0.00" icon={<WalletIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Pending Balance" value="$0.00" icon={<ClockIcon size={20} className="text-yellow-600" />} iconBg="bg-yellow-100 dark:bg-yellow-900/30" />
        <StatCard label="Total Deposited" value="$0.00" icon={<DollarIcon size={20} className="text-primary-600" />} />
        <StatCard label="Total Withdrawn" value="$0.00" icon={<DollarIcon size={20} className="text-red-600" />} iconBg="bg-red-100 dark:bg-red-900/30" />
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Wallet Info</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Your SignalForge wallet is separate from your trading account balance and referral wallet.
          Use it to pay for subscriptions and receive refunds.
        </p>
      </Card>
    </div>
  );
}