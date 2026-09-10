import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { ReferralIcon, DollarIcon } from '../../components/ui/icons';

export function ReferralCost() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Referral Cost</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Cost of referral program</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Paid" value="$0.00" icon={<DollarIcon size={20} className="text-primary-600" />} />
        <StatCard label="Pending" value="$0.00" icon={<ReferralIcon size={20} className="text-yellow-600" />} iconBg="bg-yellow-100 dark:bg-yellow-900/30" />
        <StatCard label="This Month" value="$0.00" icon={<DollarIcon size={20} className="text-red-600" />} iconBg="bg-red-100 dark:bg-red-900/30" />
      </div>
    </div>
  );
}