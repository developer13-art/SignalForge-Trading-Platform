import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { DollarIcon, CheckIcon, ClockIcon, AlertIcon } from '../../components/ui/icons';

export function PaymentManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Management</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage platform payments</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value="$0.00" icon={<DollarIcon size={20} className="text-primary-600" />} />
        <StatCard label="Successful" value="0" icon={<CheckIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Pending" value="0" icon={<ClockIcon size={20} className="text-yellow-600" />} iconBg="bg-yellow-100 dark:bg-yellow-900/30" />
        <StatCard label="Failed" value="0" icon={<AlertIcon size={20} className="text-red-600" />} iconBg="bg-red-100 dark:bg-red-900/30" />
      </div>
    </div>
  );
}