import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AlertIcon } from '../ui/icons';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'primary';
  isLoading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  isLoading,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="flex items-start gap-3 mb-6">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
          variant === 'danger' ? 'bg-red-100 dark:bg-red-900/30' :
          variant === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
          'bg-blue-100 dark:bg-blue-900/30'
        }`}>
          <AlertIcon size={20} className={
            variant === 'danger' ? 'text-red-600 dark:text-red-400' :
            variant === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
            'text-blue-600 dark:text-blue-400'
          } />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{message}</p>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          {cancelLabel}
        </Button>
        <Button variant={variant === 'primary' ? 'primary' : 'danger'} onClick={onConfirm} isLoading={isLoading}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}