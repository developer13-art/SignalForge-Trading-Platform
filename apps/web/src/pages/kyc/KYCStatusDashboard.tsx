import React, { useEffect } from 'react';
import { useKycStore } from '../../stores/kyc.store';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import {
  KycIcon,
  CheckIcon,
  AlertIcon,
  ClockIcon,
  ArrowRightIcon,
} from '../../components/ui/icons';

const statusConfig: Record<string, { label: string; variant: 'success' | 'danger' | 'warning' | 'info' | 'neutral'; icon: React.ReactNode }> = {
  NOT_STARTED: { label: 'Not Started', variant: 'neutral', icon: <KycIcon size={20} /> },
  PENDING: { label: 'Pending', variant: 'warning', icon: <ClockIcon size={20} /> },
  UNDER_REVIEW: { label: 'Under Review', variant: 'info', icon: <ClockIcon size={20} /> },
  VERIFIED: { label: 'Verified', variant: 'success', icon: <CheckIcon size={20} /> },
  REJECTED: { label: 'Rejected', variant: 'danger', icon: <AlertIcon size={20} /> },
  EXPIRED: { label: 'Expired', variant: 'danger', icon: <AlertIcon size={20} /> },
  SUSPENDED: { label: 'Suspended', variant: 'danger', icon: <AlertIcon size={20} /> },
};

export function KYCStatusDashboard() {
  const { status, isLoading, error, fetchStatus } = useKycStore();

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="text-center py-12">
          <AlertIcon size={48} className="text-red-500 mx-auto mb-4" />
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <Button className="mt-4" onClick={fetchStatus}>Retry</Button>
        </div>
      </Card>
    );
  }

  const currentStatus = status?.status || 'NOT_STARTED';
  const statusConfigItem = statusConfig[currentStatus];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <KycIcon size={40} className="text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">KYC Verification</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Verify your identity to unlock all platform features
          </p>
          <div className="mt-4">
            <Badge variant={statusConfigItem.variant} size="lg">
              {statusConfigItem.label}
            </Badge>
          </div>
        </div>
      </Card>

      {currentStatus === 'NOT_STARTED' && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Start Verification</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            You'll need to provide personal information and a valid government-issued ID.
          </p>
          <Button onClick={() => useKycStore.getState().startApplication()}>
            Start KYC Verification
            <ArrowRightIcon size={18} />
          </Button>
        </Card>
      )}

      {currentStatus === 'PENDING' && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Complete Your Application</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Continue your KYC application by providing the required information and documents.
          </p>
          <Button className="mt-4">
            Continue Application
            <ArrowRightIcon size={18} />
          </Button>
        </Card>
      )}

      {currentStatus === 'UNDER_REVIEW' && (
        <Card>
          <div className="flex items-start gap-3">
            <ClockIcon size={24} className="text-blue-500 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Application Under Review</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Your KYC application is being reviewed. This typically takes 1-3 business days.
                You'll be notified once the review is complete.
              </p>
              {status?.submittedAt && (
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Submitted: {new Date(status.submittedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </Card>
      )}

      {currentStatus === 'VERIFIED' && (
        <Card>
          <div className="flex items-start gap-3">
            <CheckIcon size={24} className="text-green-500 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Verification Complete</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Your identity has been verified. You now have access to all platform features including
                trading, subscriptions, and referrals.
              </p>
              {status?.verifiedAt && (
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Verified: {new Date(status.verifiedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </Card>
      )}

      {currentStatus === 'REJECTED' && (
        <Card>
          <div className="flex items-start gap-3">
            <AlertIcon size={24} className="text-red-500 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Application Rejected</h3>
              {status?.rejectionReason && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  Reason: {status.rejectionReason}
                </p>
              )}
              <Button
                className="mt-4"
                onClick={() => useKycStore.getState().startApplication()}
              >
                Resubmit Application
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}