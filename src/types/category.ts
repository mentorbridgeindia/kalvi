import type { Status } from '@/lib/constants';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  status: Status;
  createdAt: Date;
}

export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  categoryId: string;
  status: Status;
  createdAt: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CategoryFormInput {
  name: string;
  status?: Status;
}

export interface SubCategoryFormInput {
  name: string;
  categoryId: string;
  status?: Status;
}

