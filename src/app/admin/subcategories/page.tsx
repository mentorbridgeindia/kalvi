'use client';

import { useState } from 'react';
import { Card, Button, Loader, ConfirmModal, Input, EmptyState, IconPlus } from '@/ui';
import { SubCategoryTable } from './components/SubCategoryTable';
import { SubCategoryModal } from './components/SubCategoryModal';
import {
  useSubCategories,
  useCreateSubCategory,
  useUpdateSubCategory,
  useDeleteSubCategory,
} from '@/hooks/useSubCategories';
import { useCategories } from '@/hooks/useCategories';
import { PaginationControls } from '@/ui/pagination';
import type { SubCategory, SubCategoryFormInput } from '@/types/category';

export default function SubCategoriesPage() {
  const [page, setPage] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState<SubCategory | null>(null);
  const [deletingSubCategory, setDeletingSubCategory] = useState<SubCategory | null>(null);

  const { data: categoriesData, isLoading: isCategoriesLoading } = useCategories(1, 100);
  const { data, isLoading, error } = useSubCategories(
    selectedCategoryId || '',
    page,
    10,
    search
  );
  const createMutation = useCreateSubCategory();
  const updateMutation = useUpdateSubCategory();
  const deleteMutation = useDeleteSubCategory();

  const handleCreate = () => {
    setEditingSubCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (subCategory: SubCategory) => {
    setEditingSubCategory(subCategory);
    setIsModalOpen(true);
  };

  const handleDelete = (subCategory: SubCategory) => {
    setDeletingSubCategory(subCategory);
  };

  const handleSave = async (formData: SubCategoryFormInput) => {
    if (editingSubCategory) {
      const result = await updateMutation.mutateAsync({
        id: editingSubCategory._id,
        data: formData,
      });
      if (result.success) {
        setIsModalOpen(false);
        setEditingSubCategory(null);
      }
    } else {
      const result = await createMutation.mutateAsync({
        name: formData.name,
        categoryId: selectedCategoryId,
      });
      if (result.success) {
        setIsModalOpen(false);
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingSubCategory) {
      await deleteMutation.mutateAsync(deletingSubCategory._id);
      setDeletingSubCategory(null);
    }
  };

  // Redesigned UI
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-secondary-900 mb-1">Subcategories</h1>
          <p className="text-secondary-600 text-base">
            Manage your subcategories by selecting a category and exploring its subcategories.
          </p>
        </div>
        <Button
          leftIcon={<IconPlus />}
          onClick={handleCreate}
          disabled={!selectedCategoryId || createMutation.isPending || isCategoriesLoading}
          size="lg"
        >
          New Subcategory
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-8 p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category-select" className="mb-2 block text-sm font-semibold text-secondary-700">
              Filter by Category
            </label>
            <select
              id="category-select"
              value={selectedCategoryId}
              onChange={(e) => {
                setSelectedCategoryId(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-md border border-secondary-300 px-3 py-2 text-base shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
              disabled={isCategoriesLoading}
            >
              <option value="">Select a category...</option>
              {categoriesData?.data.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="subcategory-search" className="mb-2 block text-sm font-semibold text-secondary-700">
              Search Subcategories
            </label>
            <Input
              id="subcategory-search"
              type="search"
              placeholder="Search by subcategory name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              disabled={!selectedCategoryId}
            />
          </div>
        </div>
      </Card>

      {/* Main Content */}
      <Card>
        {error && (
          <div className="mb-4 rounded-lg bg-error-50 p-4 text-error-800 border border-error-200">
            <strong className="block mb-1">Error loading subcategories:</strong>
            <span>{error instanceof Error ? error.message : 'Unknown error'}</span>
          </div>
        )}

        {isLoading && selectedCategoryId ? (
          <div className="py-16 flex justify-center items-center">
            <Loader size="lg" />
          </div>
        ) : !selectedCategoryId ? (
          <EmptyState
            title="No category selected"
            description="Please select a category to view its subcategories."
            className="py-12"
          />
        ) : data && (data.data.length > 0) ? (
          <>
            <SubCategoryTable
              subCategories={data?.data ?? []}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            {data && data.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <PaginationControls
                  currentPage={page}
                  totalPages={data.totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        ) : (
          <EmptyState
            title="No subcategories found"
            description="There are no subcategories for the selected category."
            className="py-12"
          />
        )}
      </Card>

      {/* Modals */}
      <SubCategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSubCategory(null);
        }}
        onSave={handleSave}
        subCategory={editingSubCategory}
        defaultCategoryId={selectedCategoryId}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <ConfirmModal
        isOpen={!!deletingSubCategory}
        onClose={() => setDeletingSubCategory(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Subcategory"
        message={`Are you sure you want to delete "${deletingSubCategory?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="primary"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}

