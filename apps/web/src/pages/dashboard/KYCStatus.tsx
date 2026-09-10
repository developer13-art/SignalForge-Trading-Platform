import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { KycIcon, ArrowRightIcon } from '../../components/ui/icons';
import { useAuthStore } from '../../stores/auth.store';

export function KYCStatus() {
  const { user } = useAuthStore();
  const status = user?.kycStatus || 'NOT_STARTED';

  const variants: Record<string, any> = {
    NOT_STARTED: 'neutral',
    PENDING: 'warning',
    UNDER_REVIEW: 'info',
    VERIFIED: 'success',
    REJECTED: 'danger',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">KYC Status</h1>
      </div>

      <Card>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center shrink-0">
            <KycIcon size={24} className="text-primary-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">Identity Verification</h3>
              <Badge variant={variants[status] || 'neutral'}>{status}</Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {status === 'VERIFIED'
                ? 'Your identity has been verified. All features are unlocked.'
                : 'Complete KYC verification to unlock all features including trading and subscriptions.'}
            </p>
            {status !== 'VERIFIED' && status !== 'UNDER_REVIEW' && (
              <Link to="/kyc">
                <Button size="sm">
                  {status === 'REJECTED' ? 'Resubmit KYC' : 'Start Verification'}
                  <ArrowRightIcon size={16} />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}