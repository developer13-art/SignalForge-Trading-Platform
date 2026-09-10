import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { Spinner } from '../../components/ui/Spinner';
import { brokerService, BrokerAccount } from '../../services/broker.service';
import { WalletIcon, TrendingUpIcon, BrokerIcon, AnalyticsIcon } from '../../components/ui/icons';

export function AccountSummary() {
  const [accounts, setAccounts] = useState<BrokerAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    brokerService.getAccounts().then(setAccounts).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
  const totalEquity = accounts.reduce((sum, a) => sum + a.equity, 0);
  const totalMargin = accounts.reduce((sum, a) => sum + a.margin, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Summary</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Overview of your connected broker accounts
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Balance"
          value={`$${totalBalance.toFixed(2)}`}
          icon={<WalletIcon size={20} className="text-primary-600" />}
        />
        <StatCard
          label="Total Equity"
          value={`$${totalEquity.toFixed(2)}`}
          icon={<TrendingUpIcon size={20} className="text-green-600" />}
          iconBg="bg-green-100 dark:bg-green-900/30"
        />
        <StatCard
          label="Used Margin"
          value={`$${totalMargin.toFixed(2)}`}
          icon={<AnalyticsIcon size={20} className="text-yellow-600" />}
          iconBg="bg-yellow-100 dark:bg-yellow-900/30"
        />
        <StatCard
          label="Accounts"
          value={accounts.length}
          icon={<BrokerIcon size={20} className="text-blue-600" />}
          iconBg="bg-blue-100 dark:bg-blue-900/30"
        />
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Details</h3>
        {accounts.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
            No broker accounts connected
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 text-xs font-medium text-gray-500 uppercase">Account</th>
                  <th className="text-left py-3 text-xs font-medium text-gray-500 uppercase">Platform</th>
                  <th className="text-left py-3 text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="text-right py-3 text-xs font-medium text-gray-500 uppercase">Balance</th>
                  <th className="text-right py-3 text-xs font-medium text-gray-500 uppercase">Equity</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((a) => (
                  <tr key={a.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 text-gray-900 dark:text-white font-medium">{a.nickname}</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">{a.platform}</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">{a.accountType}</td>
                    <td className="py-3 text-right text-gray-900 dark:text-white">${a.balance.toFixed(2)}</td>
                    <td className="py-3 text-right text-gray-900 dark:text-white">${a.equity.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}