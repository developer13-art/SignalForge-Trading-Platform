import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AlertIcon } from '../../components/ui/icons';
import { ConfirmModal } from '../../components/modals/ConfirmModal';
import toast from 'react-hot-toast';

export function DisconnectBroker() {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    toast.success('Broker disconnected');
    setShowConfirm(false);
    navigate('/brokers');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertIcon size={32} className="text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Disconnect Broker</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Disconnecting will stop all automated trading on this account. Your trade history and analytics remain.
          </p>
          <div className="mt-6">
            <Button variant="danger" onClick={() => setShowConfirm(true)}>Disconnect Account</Button>
          </div>
        </div>
      </Card>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        title="Disconnect Broker?"
        message="Automated trading will stop immediately. Continue?"
        confirmLabel="Yes, Disconnect"
      />
    </div>
  );
}