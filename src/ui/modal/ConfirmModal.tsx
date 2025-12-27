'use client';

import { type HTMLAttributes, forwardRef } from 'react';
import { Button } from '../button';

export interface ConfirmModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
}

export const ConfirmModal = forwardRef<HTMLDivElement, ConfirmModalProps>(
  (
    {
      isOpen,
      onClose,
      onConfirm,
      title,
      message,
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      confirmVariant = 'primary',
      isLoading = false,
      className = '',
      ...props
    },
    ref
  ) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
      onConfirm();
    };

    const handleCancel = () => {
      if (!isLoading) {
        onClose();
      }
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget && !isLoading) {
        onClose();
      }
    };

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div
          ref={ref}
          className={`w-full max-w-md rounded-lg bg-white p-6 shadow-lg ${className}`}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          <h2
            id="modal-title"
            className="mb-4 text-lg font-semibold text-secondary-900"
          >
            {title}
          </h2>
          <p
            id="modal-description"
            className="mb-6 text-sm text-secondary-600"
          >
            {message}
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              {cancelText}
            </Button>
            <Button
              variant={confirmVariant}
              onClick={handleConfirm}
              isLoading={isLoading}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

ConfirmModal.displayName = 'ConfirmModal';

