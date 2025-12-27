'use server';

import * as categoryService from '@/services/category.service';
import type { Category, CategoryFormInput } from '@/types/category';

export async function createCategory(
  name: string
): Promise<
  { success: true; data: Category } | { success: false; error: string }
> {
  try {
    if (!name || name.trim().length === 0) {
      return { success: false, error: 'Category name is required' };
    }

    const category = await categoryService.createCategory(name);
    return { success: true, data: category };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to create category',
    };
  }
}

export async function updateCategory(
  id: string,
  data: CategoryFormInput
): Promise<
  { success: true; data: Category } | { success: false; error: string }
> {
  try {
    if (!id) {
      return { success: false, error: 'Category ID is required' };
    }

    const category = await categoryService.updateCategory(id, data);
    return { success: true, data: category };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to update category',
    };
  }
}

export async function deleteCategory(
  id: string
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    if (!id) {
      return { success: false, error: 'Category ID is required' };
    }

    await categoryService.deleteCategory(id);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to delete category',
    };
  }
}

export async function getCategories(
  page: number = 1,
  limit: number = 10
): Promise<
  | {
      success: true;
      data: Awaited<ReturnType<typeof categoryService.getCategories>>;
    }
  | { success: false; error: string }
> {
  try {
    const result = await categoryService.getCategories(page, limit);
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to fetch categories',
    };
  }
}
