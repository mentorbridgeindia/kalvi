'use client';

import { STATUS } from '@/lib/constants';
import type { Category, CategoryFormInput } from '@/types/category';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { useEffect, useRef, useState } from 'react';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CategoryFormInput) => void;
  category?: Category | null;
  isLoading?: boolean;
}

export function CategoryModal({
  isOpen,
  onClose,
  onSave,
  category,
  isLoading = false,
}: CategoryModalProps) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<
    typeof STATUS.ACTIVE | typeof STATUS.INACTIVE
  >(STATUS.ACTIVE);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setStatus(category.status);
    } else {
      setName('');
      setStatus(STATUS.ACTIVE);
    }
    setError(null);
    // When opening, autofocus on input
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [category, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (!name.trim()) {
      setError('Category name is required.');
      inputRef.current?.focus();
      return;
    }
    setError(null);
    onSave({ name: name.trim(), status });
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) {
        onClose();
      }
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [isOpen, onClose, isLoading]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-900/60 backdrop-blur-sm transition-all duration-200"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="category-modal-title"
    >
      <Card className="relative w-full max-w-lg p-0 rounded-xl overflow-hidden shadow-xl animate-in slide-in-from-bottom-8 fade-in">
        <header className="flex items-center justify-between border-b border-secondary-100 px-7 py-4 bg-secondary-50">
          <h2
            id="category-modal-title"
            className="text-lg font-bold text-secondary-900 tracking-tight"
          >
            {category ? 'Edit Category' : 'Create Category'}
          </h2>
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="text-secondary-500 hover:text-secondary-900"
            aria-label="Close modal"
            disabled={isLoading}
          >
            <svg
              className="h-5 w-5 text-secondary-500"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6l8 8m0-8l-8 8"
              />
            </svg>
          </Button>
        </header>
        <form onSubmit={handleSubmit} className="px-7 pt-6 pb-6">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="category-name"
                className="mb-2 block text-sm font-medium text-secondary-700"
              >
                Name <span className="text-error-600">*</span>
              </label>
              <input
                id="category-name"
                type="text"
                ref={inputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={64}
                placeholder="Enter category name"
                autoComplete="off"
                className="w-full rounded-md border border-secondary-300 px-3 py-2 text-base focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:bg-secondary-100"
                disabled={isLoading}
                aria-invalid={!!error}
              />
              {error && (
                <div className="mt-2 text-xs text-error-600">{error}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="category-status"
                className="mb-2 block text-sm font-medium text-secondary-700"
              >
                Status
              </label>
              <div className="flex gap-4">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    id="category-status-active"
                    name="category-status"
                    value={STATUS.ACTIVE}
                    checked={status === STATUS.ACTIVE}
                    onChange={() => setStatus(STATUS.ACTIVE)}
                    className="accent-primary-600"
                    disabled={isLoading}
                  />
                  <span className="text-secondary-800 text-sm">Active</span>
                </label>
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    id="category-status-inactive"
                    name="category-status"
                    value={STATUS.INACTIVE}
                    checked={status === STATUS.INACTIVE}
                    onChange={() => setStatus(STATUS.INACTIVE)}
                    className="accent-error-500"
                    disabled={isLoading}
                  />
                  <span className="text-secondary-800 text-sm">Inactive</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-1">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={isLoading} variant="primary">
                {category ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
