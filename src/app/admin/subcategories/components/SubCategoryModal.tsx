'use client';

import { useCategories } from '@/hooks/useCategories';
import { STATUS } from '@/lib/constants';
import type { SubCategory, SubCategoryFormInput } from '@/types/category';
import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { Input } from '@/ui/input';
import { useEffect, useState } from 'react';

interface SubCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: SubCategoryFormInput) => void;
  subCategory?: SubCategory | null;
  defaultCategoryId?: string;
  isLoading?: boolean;
}

export function SubCategoryModal({
  isOpen,
  onClose,
  onSave,
  subCategory,
  defaultCategoryId,
  isLoading = false,
}: SubCategoryModalProps) {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(defaultCategoryId || '');
  const [status, setStatus] = useState<
    typeof STATUS.ACTIVE | typeof STATUS.INACTIVE
  >(STATUS.ACTIVE);
  const [nameError, setNameError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [statusError, setStatusError] = useState('');

  const { data: categoriesData } = useCategories(1, 100);

  useEffect(() => {
    if (subCategory) {
      setName(subCategory.name);
      setCategoryId(subCategory.categoryId);
      setStatus(subCategory.status);
    } else {
      setName('');
      setCategoryId(defaultCategoryId || '');
      setStatus(STATUS.ACTIVE);
    }
    setNameError('');
    setCategoryError('');
    setStatusError('');
  }, [subCategory, defaultCategoryId, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    let valid = true;
    if (!name.trim()) {
      setNameError('Subcategory name is required');
      valid = false;
    } else {
      setNameError('');
    }
    if (!categoryId) {
      setCategoryError('Category is required');
      valid = false;
    } else {
      setCategoryError('');
    }
    if (status !== STATUS.ACTIVE && status !== STATUS.INACTIVE) {
      setStatusError('Status is required');
      valid = false;
    } else {
      setStatusError('');
    }
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    onSave({ name: name.trim(), categoryId, status });
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      <Card
        className="w-full max-w-lg rounded-xl shadow-xl bg-white border-0 px-0 py-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-0">
          <div className="flex items-center justify-between border-b px-8 py-6">
            <h2 className="text-xl font-bold text-secondary-900">
              {subCategory ? 'Edit Subcategory' : 'Create Subcategory'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-secondary-50 transition"
              disabled={isLoading}
              aria-label="Close"
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
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5 px-8 py-6">
            <div>
              <label
                htmlFor="category"
                className="mb-1 block text-sm font-medium text-secondary-700"
              >
                Category <span className="text-error-500">*</span>
              </label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                className={`w-full rounded-md border px-3 py-2 text-sm transition-colors focus:outline-none
                  focus:ring-2 focus:ring-primary-500
                  ${categoryError ? 'border-error-300 text-error-900' : 'border-secondary-300 text-secondary-900'}
                  ${isLoading || !!subCategory ? 'bg-secondary-100' : 'bg-white'}
                `}
                disabled={isLoading || !!subCategory}
              >
                <option value="">Select a category</option>
                {categoriesData?.data.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {categoryError && (
                <div className="mt-1 text-xs text-error-600">
                  {categoryError}
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-secondary-700"
              >
                Subcategory Name <span className="text-error-500">*</span>
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                error={!!nameError}
                disabled={isLoading}
                autoFocus
                placeholder="Enter subcategory name"
              />
              {nameError && (
                <div className="mt-1 text-xs text-error-600">{nameError}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="status"
                className="mb-1 block text-sm font-medium text-secondary-700"
              >
                Status <span className="text-error-500">*</span>
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as
                      | typeof STATUS.ACTIVE
                      | typeof STATUS.INACTIVE
                  )
                }
                className={`w-full rounded-md border px-3 py-2 text-sm transition-colors focus:outline-none
                  focus:ring-2 focus:ring-primary-500
                  ${statusError ? 'border-error-300 text-error-900' : 'border-secondary-300 text-secondary-900'}
                  ${isLoading ? 'bg-secondary-100' : 'bg-white'}
                `}
                disabled={isLoading}
              >
                <option value={STATUS.ACTIVE}>Active</option>
                <option value={STATUS.INACTIVE}>Inactive</option>
              </select>
              {statusError && (
                <div className="mt-1 text-xs text-error-600">{statusError}</div>
              )}
            </div>
            <div className="flex justify-end gap-4 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="min-w-[96px] font-medium"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isLoading}
                className="min-w-[96px] font-medium"
              >
                {subCategory ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
