import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/cards/StatCard';
import { Spinner } from '../../components/ui/Spinner';
import { WalletIcon, DollarIcon, TrendingUpIcon } from '../../components/ui/icons';
import { referralService } from '../../services/referral.service';

export function ReferralWallet() {
  const [wallet, setWallet] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    referralService.getWallet().then((data) => setWallet(data.wallet)).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Referral Wallet</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Your referral earnings wallet
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Available Balance" value={`$${(wallet?.availableBalance || 0).toFixed(2)}`} icon={<WalletIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Pending Balance" value={`$${(wallet?.pendingBalance || 0).toFixed(2)}`} icon={<DollarIcon size={20} className="text-yellow-600" />} iconBg="bg-yellow-100 dark:bg-yellow-900/30" />
        <StatCard label="Lifetime Earned" value={`$${(wallet?.lifetimeEarned || 0).toFixed(2)}`} icon={<TrendingUpIcon size={20} className="text-primary-600" />} />
      </div>
    </div>
  );
}