import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatCard } from '../../components/cards/StatCard';
import { ReferralIcon, UsersIcon, DollarIcon, ArrowRightIcon } from '../../components/ui/icons';
import { Spinner } from '../../components/ui/Spinner';
import { referralService, ReferralDashboard } from '../../services/referral.service';

export function ReferralSummary() {
  const [data, setData] = useState<ReferralDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    referralService.getDashboard().then(setData).catch(() => {}).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Referral Summary</h1>
        <Link to="/referrals">
          <Button variant="outline" size="sm">
            View Details <ArrowRightIcon size={16} />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Referrals" value={data?.totalReferrals || 0} icon={<UsersIcon size={20} className="text-primary-600" />} />
        <StatCard label="Active" value={data?.activeReferrals || 0} icon={<ReferralIcon size={20} className="text-green-600" />} iconBg="bg-green-100 dark:bg-green-900/30" />
        <StatCard label="Earnings" value={`$${(data?.wallet.lifetimeEarned || 0).toFixed(2)}`} icon={<DollarIcon size={20} className="text-purple-600" />} iconBg="bg-purple-100 dark:bg-purple-900/30" />
      </div>
    </div>
  );
}