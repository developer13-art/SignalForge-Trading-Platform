import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { StatCard } from '../../components/cards/StatCard';
import { Spinner } from '../../components/ui/Spinner';
import { EmptyState } from '../../components/common/EmptyState';
import {
  SignalIcon,
  TradingIcon,
  WalletIcon,
  KycIcon,
  SubscriptionIcon,
  ReferralIcon,
  AlertIcon,
  ArrowRightIcon,
} from '../../components/ui/icons';
import { useAuthStore } from '../../stores/auth.store';
import { useKycStore } from '../../stores/kyc.store';
import { dashboardService, DashboardOverview as OverviewData } from '../../services/dashboard.service';

export function DashboardOverview() {
  const { user } = useAuthStore();
  const { status, fetchStatus } = useKycStore();
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [recentTrades, setRecentTrades] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStatus();
    Promise.all([
      dashboardService.getOverview(),
      dashboardService.getRecentTrades(),
    ])
      .then(([o, t]) => {
        setOverview(o);
        setRecentTrades(t);
      })
      .finally(() => setIsLoading(false));
  }, [fetchStatus]);

  const kycStatus = status?.status || user?.kycStatus || 'NOT_STARTED';
  const isKycVerified = kycStatus === 'VERIFIED';

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KYC Warning Banner */}
      {!isKycVerified && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 flex items-center gap-3">
          <AlertIcon size={20} className="text-yellow-600 dark:text-yellow-400 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
              {kycStatus === 'UNDER_REVIEW'
                ? 'KYC Under Review'
                : kycStatus === 'PENDING'
                ? 'Complete Your KYC Application'
                : kycStatus === 'REJECTED'
                ? 'KYC Rejected — Resubmit'
                : 'Account Not Verified'}
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              {kycStatus === 'UNDER_REVIEW'
                ? 'Your application is being reviewed. This takes 1-3 business days.'
                : kycStatus === 'REJECTED'
                ? 'Your previous application was rejected. Please resubmit.'
                : 'Complete KYC verification to unlock trading, subscriptions, and referrals.'}
            </p>
          </div>
          <Link to="/kyc">
            <Button size="sm">
              {kycStatus === 'REJECTED'
                ? 'Resubmit'
                : kycStatus === 'PENDING'
                ? 'Continue'
                : kycStatus === 'UNDER_REVIEW'
                ? 'View Status'
                : 'Verify Now'}
              <ArrowRightIcon size={14} />
            </Button>
          </Link>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Account Balance"
          value={`$${(overview?.balance || 0).toFixed(2)}`}
          subValue={overview?.equity ? `Equity: $${overview.equity.toFixed(2)}` : undefined}
          icon={<WalletIcon size={20} className="text-primary-600" />}
        />
        <StatCard
          label="Open Positions"
          value={overview?.openTrades || 0}
          subValue={`Net P&L: $${(overview?.netPnL || 0).toFixed(2)}`}
          icon={<TradingIcon size={20} className="text-green-600" />}
          iconBg="bg-green-100 dark:bg-green-900/30"
        />
        <StatCard
          label="Signals (24h)"
          value={overview?.recentSignals || 0}
          subValue={`Win rate: ${(overview?.winRate || 0).toFixed(1)}%`}
          icon={<SignalIcon size={20} className="text-blue-600" />}
          iconBg="bg-blue-100 dark:bg-blue-900/30"
        />
        <StatCard
          label="Subscriptions"
          value={overview?.activeSubscriptions || 0}
          subValue="Active"
          icon={<SubscriptionIcon size={20} className="text-purple-600" />}
          iconBg="bg-purple-100 dark:bg-purple-900/30"
        />
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/kyc">
          <Card hoverable>
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isKycVerified
                    ? 'bg-green-100 dark:bg-green-900/30'
                    : 'bg-yellow-100 dark:bg-yellow-900/30'
                }`}
              >
                <KycIcon
                  size={20}
                  className={
                    isKycVerified
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-yellow-600 dark:text-yellow-400'
                  }
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">KYC Status</p>
                <Badge variant={isKycVerified ? 'success' : kycStatus === 'REJECTED' ? 'danger' : 'warning'}>
                  {kycStatus.replace(/_/g, ' ')}
                </Badge>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/subscriptions">
          <Card hoverable>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <SubscriptionIcon size={20} className="text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Subscription</p>
                <Badge variant={overview?.activeSubscriptions ? 'success' : 'neutral'}>
                  {overview?.activeSubscriptions ? 'Active' : 'No Active Plan'}
                </Badge>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/brokers">
          <Card hoverable>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <TradingIcon size={20} className="text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Broker</p>
                <Badge variant={overview?.balance ? 'success' : 'neutral'}>
                  {overview?.balance ? 'Connected' : 'Not Connected'}
                </Badge>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Quick Actions */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link to="/signal-sources/add">
            <button className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
              <SignalIcon size={20} className="text-primary-600 dark:text-primary-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Connect Signal Source</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Telegram, Discord, Email</p>
            </button>
          </Link>
          <Link to="/brokers/connect">
            <button className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
              <TradingIcon size={20} className="text-green-600 dark:text-green-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Connect Broker</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">MT4/MT5 via MetaApi</p>
            </button>
          </Link>
          <Link to="/subscriptions/plans">
            <button className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
              <SubscriptionIcon size={20} className="text-purple-600 dark:text-purple-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">View Pricing Plans</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Monthly or Yearly</p>
            </button>
          </Link>
          <Link to="/referrals">
            <button className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
              <ReferralIcon size={20} className="text-orange-600 dark:text-orange-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Invite Friends</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Earn referral rewards</p>
            </button>
          </Link>
        </div>
      </Card>

      {/* Recent Trades */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Trades</h3>
          <Link to="/trading">
            <Button variant="ghost" size="sm">
              View All <ArrowRightIcon size={14} />
            </Button>
          </Link>
        </div>
        {recentTrades.length > 0 ? (
          <div className="space-y-2">
            {recentTrades.slice(0, 5).map((t: any) => (
              <div
                key={t.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex items-center gap-3">
                  <Badge variant={t.direction === 'BUY' ? 'success' : 'danger'}>
                    {t.direction}
                  </Badge>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {t.symbol}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {t.volume} lots
                  </span>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    (t.realizedProfit || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {(t.realizedProfit || 0) >= 0 ? '+' : ''}${(t.realizedProfit || 0).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<TradingIcon size={32} className="text-gray-400" />}
            title="No Trades Yet"
            description="Your trades will appear here once you connect a signal source and broker."
          />
        )}
      </Card>
    </div>
  );
}