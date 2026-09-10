import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ClockIcon, ArrowRightIcon } from '../../components/ui/icons';

export function KYCReviewStatus() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <ClockIcon size={40} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Under Review</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Your KYC application has been submitted and is now under review.
            This typically takes 1-3 business days.
          </p>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            You will be notified by email once the review is complete.
          </p>
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">While You Wait</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          You can explore these features while your KYC is being processed:
        </p>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-between" onClick={() => navigate('/dashboard')}>
            Explore Dashboard <ArrowRightIcon size={16} />
          </Button>
          <Button variant="outline" className="w-full justify-between" onClick={() => navigate('/subscriptions/plans')}>
            View Subscription Plans <ArrowRightIcon size={16} />
          </Button>
        </div>
      </Card>
    </div>
  );
}