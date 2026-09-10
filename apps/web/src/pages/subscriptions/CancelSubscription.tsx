import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Textarea } from '../../components/ui/Textarea';
import { AlertIcon, ArrowLeftIcon } from '../../components/ui/icons';
import { ConfirmModal } from '../../components/modals/ConfirmModal';
import { subscriptionService } from '../../services/subscription.service';
import toast from 'react-hot-toast';

export function CancelSubscription() {
  const navigate = useNavigate();
  const [reason, setReason] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await subscriptionService.cancelSubscription(reason);
      toast.success('Subscription cancelled');
      navigate('/subscriptions');
    } catch {
      toast.error('Failed to cancel');
    } finally {
      setIsLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/subscriptions')} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cancel Subscription</h1>
      </div>

      <Card>
        <div className="flex items-start gap-3 mb-6">
          <AlertIcon size={20} className="text-yellow-600 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">We're sorry to see you go</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              You will retain access until the end of your current billing period. Your data will be preserved.
            </p>
          </div>
        </div>

        <Textarea
          label="Reason for Cancelling (Optional)"
          placeholder="Help us improve by telling us why..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
        />

        <Button variant="danger" onClick={() => setShowConfirm(true)} className="w-full mt-4">
          Cancel Subscription
        </Button>
      </Card>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        title="Cancel Subscription?"
        message="Your subscription will remain active until the current period ends. Continue?"
        confirmLabel="Yes, Cancel"
        isLoading={isLoading}
      />
    </div>
  );
}