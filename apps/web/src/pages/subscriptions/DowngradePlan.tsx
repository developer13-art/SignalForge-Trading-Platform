import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AlertIcon, ArrowLeftIcon } from '../../components/ui/icons';
import toast from 'react-hot-toast';

export function DowngradePlan() {
  const navigate = useNavigate();

  const handleDowngrade = () => {
    toast.success('Downgrade request submitted');
    navigate('/subscriptions');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/subscriptions')} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Downgrade Plan</h1>
      </div>

      <Card>
        <div className="flex items-start gap-3 mb-6">
          <AlertIcon size={20} className="text-yellow-600 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Downgrading limits some features</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Your new plan will take effect at the end of your current billing period.
            </p>
          </div>
        </div>
        <Button variant="danger" onClick={handleDowngrade} className="w-full">
          Confirm Downgrade
        </Button>
      </Card>
    </div>
  );
}