import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Spinner } from '../../components/ui/Spinner';
import { CheckIcon, AlertIcon, ClockIcon, KycIcon } from '../../components/ui/icons';
import { kycService, KycStatus } from '../../services/kyc.service';

export function VerificationResult() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<KycStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    kycService.getStatus().then(setStatus).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  const currentStatus = status?.status || 'NOT_STARTED';

  const configs: Record<string, { icon: React.ReactNode; title: string; message: string; variant: any }> = {
    NOT_STARTED: {
      icon: <KycIcon size={40} className="text-gray-500" />,
      title: 'Not Started',
      message: 'Complete your KYC verification to unlock all features.',
      variant: 'neutral',
    },
    PENDING: {
      icon: <ClockIcon size={40} className="text-yellow-500" />,
      title: 'Pending',
      message: 'Please complete all required steps.',
      variant: 'warning',
    },
    UNDER_REVIEW: {
      icon: <ClockIcon size={40} className="text-blue-500" />,
      title: 'Under Review',
      message: 'Your application is being reviewed. This takes 1-3 business days.',
      variant: 'info',
    },
    VERIFIED: {
      icon: <CheckIcon size={40} className="text-green-500" />,
      title: 'Verified',
      message: 'Your identity has been verified. You have full access to all features.',
      variant: 'success',
    },
    REJECTED: {
      icon: <AlertIcon size={40} className="text-red-500" />,
      title: 'Rejected',
      message: status?.rejectionReason || 'Your application was rejected. Please review and resubmit.',
      variant: 'danger',
    },
    EXPIRED: {
      icon: <AlertIcon size={40} className="text-red-500" />,
      title: 'Expired',
      message: 'Your verification has expired. Please re-verify.',
      variant: 'danger',
    },
    SUSPENDED: {
      icon: <AlertIcon size={40} className="text-red-500" />,
      title: 'Suspended',
      message: 'Your KYC has been suspended. Please contact support.',
      variant: 'danger',
    },
  };

  const config = configs[currentStatus] || configs.NOT_STARTED;

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <div className="text-center py-8">
          <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
            {config.icon}
          </div>
          <Badge variant={config.variant} size="lg">{config.title}</Badge>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {config.message}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            {currentStatus === 'REJECTED' && (
              <Button onClick={() => navigate('/kyc/resubmit')}>Resubmit KYC</Button>
            )}
            {currentStatus === 'VERIFIED' && (
              <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
            )}
            {currentStatus === 'NOT_STARTED' && (
              <Button onClick={() => navigate('/kyc')}>Start KYC</Button>
            )}
            {currentStatus === 'EXPIRED' && (
              <Button onClick={() => navigate('/kyc')}>Re-verify</Button>
            )}
            {currentStatus !== 'NOT_STARTED' && currentStatus !== 'VERIFIED' && currentStatus !== 'REJECTED' && currentStatus !== 'EXPIRED' && (
              <Button variant="outline" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}