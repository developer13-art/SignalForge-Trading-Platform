import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SubscriptionIcon, ArrowRightIcon } from '../../components/ui/icons';
import { Spinner } from '../../components/ui/Spinner';
import { subscriptionService, SubscriptionInfo } from '../../services/subscription.service';

export function SubscriptionStatus() {
  const [info, setInfo] = useState<SubscriptionInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    subscriptionService.getCurrentSubscription().then(setInfo).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  const sub = info?.subscription;
  const hasSub = info?.hasActiveSubscription;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Subscription Status</h1>
      </div>

      <Card>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center shrink-0">
            <SubscriptionIcon size={24} className="text-primary-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {hasSub ? sub?.planName : 'No Active Subscription'}
              </h3>
              {hasSub && <Badge variant="success">{sub?.status}</Badge>}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {hasSub
                ? `Renews on ${new Date(sub!.currentPeriodEnd).toLocaleDateString()}`
                : 'Subscribe to a plan to unlock all features.'}
            </p>
            <Link to={hasSub ? '/subscriptions' : '/subscriptions/plans'}>
              <Button size="sm">
                {hasSub ? 'Manage Subscription' : 'View Plans'}
                <ArrowRightIcon size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}