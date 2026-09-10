import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscriptionStore } from '../../stores/subscription.store';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import {
  SubscriptionIcon,
  CalendarIcon,
} from '../../components/ui/icons';

export function MySubscription() {
  const navigate = useNavigate();
  const { currentSubscription, fetchCurrentSubscription, cancelSubscription, isLoading } = useSubscriptionStore();

  useEffect(() => {
    fetchCurrentSubscription();
  }, [fetchCurrentSubscription]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  const subscription = currentSubscription?.subscription;

  if (!subscription) {
    return (
      <Card>
        <div className="text-center py-12">
          <SubscriptionIcon size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            No Active Subscription
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Subscribe to a plan to unlock all features
          </p>
          <Button className="mt-4" onClick={() => navigate('/subscriptions/plans')}>
            View Plans
          </Button>
        </div>
      </Card>
    );
  }

  const statusVariant =
    subscription.status === 'ACTIVE' ? 'success' :
    subscription.status === 'TRIAL' ? 'info' :
    subscription.status === 'GRACE_PERIOD' ? 'warning' : 'danger';

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
              <SubscriptionIcon size={24} className="text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {subscription.planName}
              </h2>
              <div className="mt-1">
                <Badge variant={statusVariant}>{subscription.status}</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
              <CalendarIcon size={16} />
              Start Date
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {new Date(subscription.startDate).toLocaleDateString()}
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
              <CalendarIcon size={16} />
              Renews On
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Manage Subscription
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Auto Renewal</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {subscription.autoRenew
                  ? 'Your subscription will renew automatically'
                  : 'Subscription will not renew automatically'}
              </p>
            </div>
            <Badge variant={subscription.autoRenew ? 'success' : 'neutral'}>
              {subscription.autoRenew ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => navigate('/subscriptions/upgrade')}>
              Upgrade Plan
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                if (confirm('Are you sure you want to cancel your subscription?')) {
                  cancelSubscription();
                }
              }}
            >
              Cancel Subscription
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}