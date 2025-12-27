'use client';

import type { SubCategory } from '@/types/category';
import { IconEdit, IconTrash } from '@/ui';
import { StatusBadge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Table, type TableColumn } from '@/ui/table';

interface SubCategoryTableProps {
  subCategories: SubCategory[];
  onEdit: (subCategory: SubCategory) => void;
  onDelete: (subCategory: SubCategory) => void;
}

export function SubCategoryTable({
  subCategories,
  onEdit,
  onDelete,
}: SubCategoryTableProps) {
  const columns: TableColumn<SubCategory>[] = [
    {
      key: 'name',
      header: (
        <span className="uppercase text-xs tracking-widest font-semibold text-secondary-500">
          Name
        </span>
      ),
      render: (subCategory) => (
        <span className="font-semibold text-secondary-900 text-base">
          {subCategory.name}
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
      render: (subCategory) => (
        <span className="text-secondary-500 italic text-sm">
          {subCategory.slug}
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
      render: (subCategory) => <StatusBadge status={subCategory.status} />,
    },
    {
      key: 'actions',
      header: (
        <span className="uppercase text-xs tracking-widest font-semibold text-secondary-500">
          Actions
        </span>
      ),
      render: (subCategory) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Edit Subcategory"
            onClick={() => onEdit(subCategory)}
            className="hover:bg-primary-50 group"
          >
            <IconEdit className="h-5 w-5 text-primary-500 group-hover:text-primary-700" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Delete Subcategory"
            onClick={() => onDelete(subCategory)}
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
      <Table columns={columns} data={subCategories} className="min-w-full" />
    </div>
  );
}
