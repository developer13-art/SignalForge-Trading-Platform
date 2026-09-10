import React, { useEffect, useState } from 'react';
import { referralService, ReferralDashboard as ReferralDashboardType } from '../../services/referral.service';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import {
  ReferralIcon,
  UsersIcon,
  DollarIcon,
  LinkIcon,
  CopyIcon,
  AlertIcon,
} from '../../components/ui/icons';
import toast from 'react-hot-toast';

export function ReferralDashboard() {
  const [data, setData] = useState<ReferralDashboardType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    referralService.getDashboard()
      .then(setData)
      .catch(() => {
        // Handle KYC error
      })
      .finally(() => setIsLoading(false));
  }, []);

  const copyReferralLink = () => {
    if (data?.referralLink) {
      navigator.clipboard.writeText(data.referralLink);
      toast.success('Referral link copied to clipboard');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;
  }

  if (!data) {
    return (
      <Card>
        <div className="text-center py-12">
          <AlertIcon size={48} className="text-yellow-500 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Complete KYC verification to access referrals
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Referral Program</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Earn 0.1% of your referrals' eligible net trading profits
        </p>
      </div>

      {/* Referral Link Card */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
            <LinkIcon size={20} className="text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Your Referral Link</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Share to earn rewards</p>
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={data.referralLink}
            className="flex-1 input-field font-mono text-sm"
          />
          <Button onClick={copyReferralLink}>
            <CopyIcon size={18} />
            Copy
          </Button>
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Your code: <span className="font-mono font-semibold">{data.referralCode}</span>
        </p>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Referrals</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{data.totalReferrals}</p>
            </div>
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
              <UsersIcon size={20} className="text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{data.activeReferrals}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <UsersIcon size={20} className="text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Available</p>
              <p className="text-2xl font-bold text-green-600 mt-1">${data.wallet.availableBalance.toFixed(2)}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <DollarIcon size={20} className="text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Lifetime</p>
              <p className="text-2xl font-bold text-primary-600 mt-1">${data.wallet.lifetimeEarned.toFixed(2)}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <ReferralIcon size={20} className="text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Referred Users */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Referred Users</h3>
        {data.referredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                  <th className="pb-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">User</th>
                  <th className="pb-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Joined</th>
                  <th className="pb-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.referredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(user.joinedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <Badge variant={user.kycStatus === 'VERIFIED' ? 'success' : 'warning'}>
                        {user.kycStatus}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
            No referrals yet. Share your link to get started.
          </div>
        )}
      </Card>
    </div>
  );
}