import React from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { SecurityIcon, LockIcon, AlertIcon, CheckIcon } from '../../components/ui/icons';

export function SecurityCenter() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Security Center</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Monitor platform security</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Sessions" value="0" icon={<SecurityIcon size={20} className="text-primary-600" />} />
        <StatCard label="Failed Logins" value="0" icon={<LockIcon size={20} className="text-red-600" />} iconBg="bg-red-100 dark:bg-red-900/30" />
        <StatCard label="Security Alerts" value="0" icon={<AlertIcon size={20} className="text-yellow-600" />} iconBg="bg-yellow-100 dark:bg-yellow-900/30" />
        <StatCard label="2FA Enabled" value="0" icon={<CheckIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
      </div>
    </div>
  );
}