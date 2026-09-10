import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { AlertIcon } from '../../components/ui/icons';
import { ConfirmModal } from '../../components/modals/ConfirmModal';
import toast from 'react-hot-toast';

export function DeleteAccount() {
  const navigate = useNavigate();
  const [confirmText, setConfirmText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
      toast.success('Account deletion requested');
      navigate('/');
    } finally {
      setIsDeleting(false);
      setShowModal(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Delete Account</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Permanently delete your account and all data
        </p>
      </div>

      <Card>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center shrink-0">
            <AlertIcon size={24} className="text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">This action is permanent</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              All your data, trades, and account information will be permanently deleted. This cannot be undone.
            </p>
          </div>
        </div>

        <Input
          label="Type 'DELETE' to confirm"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="DELETE"
        />

        <Button
          variant="danger"
          className="w-full mt-4"
          disabled={confirmText !== 'DELETE'}
          onClick={() => setShowModal(true)}
        >
          Permanently Delete Account
        </Button>
      </Card>

      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Delete Account?"
        message="This will permanently delete your account. Continue?"
        confirmLabel="Yes, Delete"
        isLoading={isDeleting}
      />
    </div>
  );
}