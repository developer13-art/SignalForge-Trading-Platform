import React from 'react';
import { Modal } from '../ui/Modal';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function FormModal({ isOpen, onClose, title, children, size = 'md' }: FormModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size={size}>
      {children}
    </Modal>
  );
}