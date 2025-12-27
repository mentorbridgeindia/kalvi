'use client';

import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from '@/hooks/useCategories';
import type { Category, CategoryFormInput } from '@/types/category';
import {
  Button,
  Card,
  ConfirmModal,
  EmptyState,
  IconEdit,
  IconPlus,
  IconTrash,
  Input,
  Loader,
  Tooltip,
} from '@/ui';
import { PaginationControls } from '@/ui/pagination';
import { useState } from 'react';
import { CategoryModal } from './components/CategoryModal';
import { CategoryTable } from './components/CategoryTable';

export default function CategoriesPage() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(
    null
  );
  const [search, setSearch] = useState('');

  const { data, isLoading, error } = useCategories(page, 10);
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const handleCreate = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (category: Category) => {
    setDeletingCategory(category);
  };

  const handleSave = async (formData: CategoryFormInput) => {
    if (editingCategory) {
      const result = await updateMutation.mutateAsync({
        id: editingCategory._id,
        data: formData,
      });
      if (result.success) {
        setIsModalOpen(false);
        setEditingCategory(null);
      }
    } else {
      const result = await createMutation.mutateAsync(formData.name);
      if (result.success) {
        setIsModalOpen(false);
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingCategory) {
      await deleteMutation.mutateAsync(deletingCategory._id);
      setDeletingCategory(null);
    }
  };

  // Search input debounce for better UX [optional, simple managing here]
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to page 1 when searching
  };

  return (
    <section className="mx-auto max-w-5xl px-2 py-6 sm:px-0">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-0 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-secondary-900">
            Manage Categories
          </h1>
          <p className="mt-1 text-secondary-600 text-sm">
            Create, edit, and organize your product categories here.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search categories..."
            value={search}
            onChange={onSearchChange}
            className="h-10 w-52 rounded-md border border-secondary-200 bg-white px-3 text-base focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Search categories"
          />
          <Button
            onClick={handleCreate}
            className="ml-1 flex items-center gap-2"
            variant="primary"
          >
            <IconPlus className="h-4 w-4" />
            <span>New Category</span>
          </Button>
        </div>
      </div>

      <Card className="shadow-md transition-shadow duration-150 hover:shadow-lg">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loader size="lg" />
          </div>
        ) : error ? (
          <div className="rounded-lg bg-error-50 p-4 text-error-800">
            Error loading categories:{' '}
            {error instanceof Error ? error.message : 'Unknown error'}
          </div>
        ) : data?.data?.length === 0 ? (
          <EmptyState
            title="No categories"
            description="Start by adding a new category to organize your content."
            action={
              <Button onClick={handleCreate} variant="primary">
                <IconPlus className="mr-2 h-4 w-4" />
                Create Category
              </Button>
            }
          />
        ) : (
          <CategoryTable categories={data?.data ?? []} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </Card>
      {/* PAGINATION */}
      {data && data.totalPages > 1 && (
        <div className="mt-6">
          <PaginationControls
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      {/* CATEGORY MODAL */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleSave}
        category={editingCategory}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      {/* CONFIRM MODAL */}
      <ConfirmModal
        isOpen={!!deletingCategory}
        onClose={() => setDeletingCategory(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        message={`Are you sure you want to delete "${deletingCategory?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="primary"
        isLoading={deleteMutation.isPending}
      />
    </section>
  );
}
