import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { kycService } from '../../services/kyc.service';
import { ArrowRightIcon, AlertIcon } from '../../components/ui/icons';
import toast from 'react-hot-toast';

export function KYCResubmission() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleResubmit = async () => {
    setIsLoading(true);
    try {
      await kycService.resubmit();
      toast.success('Ready to resubmit. Redirecting...');
      navigate('/kyc/personal-info');
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message || 'Failed to resubmit');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertIcon size={32} className="text-yellow-600 dark:text-yellow-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Resubmit KYC</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Your previous application was rejected. You can now resubmit with corrected information.
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Make sure all information is accurate and documents are clear and valid.
          </p>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleResubmit} isLoading={isLoading}>
            Begin Resubmission <ArrowRightIcon size={18} />
          </Button>
        </div>
      </Card>
    </div>
  );
}