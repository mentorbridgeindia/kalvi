'use client';

import type { Category } from '@/types/category';
import { IconEdit, IconTrash } from '@/ui';
import { StatusBadge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Table, type TableColumn } from '@/ui/table';

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export function CategoryTable({
  categories,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  const columns: TableColumn<Category>[] = [
    {
      key: 'name',
      header: (
        <span className="uppercase text-xs tracking-widest font-semibold text-secondary-500">
          Name
        </span>
      ),
      render: (category) => (
        <span className="font-semibold text-secondary-900 text-base">
          {category.name}
        </span>
      ),
    },
    {
      key: 'slug',
      header: (
        <span className="uppercase text-xs tracking-widest font-semibold text-secondary-500">
          Slug
        </span>
      ),
      render: (category) => (
        <span className="text-secondary-500 italic text-sm">
          {category.slug}
        </span>
      ),
    },
    {
      key: 'status',
      header: (
        <span className="uppercase text-xs tracking-widest font-semibold text-secondary-500">
          Status
        </span>
      ),
      render: (category) => <StatusBadge status={category.status} />,
    },
    {
      key: 'actions',
      header: (
        <span className="uppercase text-xs tracking-widest font-semibold text-secondary-500">
          Actions
        </span>
      ),
      render: (category) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Edit Category"
            onClick={() => onEdit(category)}
            className="hover:bg-primary-50 group"
          >
            <IconEdit className="h-5 w-5 text-primary-500 group-hover:text-primary-700" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Delete Category"
            onClick={() => onDelete(category)}
            className="hover:bg-error-50 group"
          >
            <IconTrash className="h-5 w-5 text-error-500 group-hover:text-error-700" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border shadow-sm bg-white">
      <Table columns={columns} data={categories} className="min-w-full" />
    </div>
  );
}
