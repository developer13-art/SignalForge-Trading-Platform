import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AlertIcon, ArrowRightIcon } from '../../components/ui/icons';

export function KYCReverification() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertIcon size={32} className="text-orange-600 dark:text-orange-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Re-verification Required</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Your identity verification needs to be renewed. This can happen due to:
          </p>

          <ul className="text-left max-w-md mx-auto mt-6 space-y-2">
            {[
              'Document expiration',
              'Material profile change',
              'Compliance review',
              'Suspicious activity detected',
              'Provider-required revalidation',
            ].map((reason) => (
              <li key={reason} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 shrink-0" />
                {reason}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button onClick={() => navigate('/kyc')}>
              Start Re-verification <ArrowRightIcon size={18} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}