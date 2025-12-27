'use server';

import * as subcategoryService from '@/services/subcategory.service';
import type { SubCategory, SubCategoryFormInput } from '@/types/category';

export async function createSubCategory(
  name: string,
  categoryId: string
): Promise<
  { success: true; data: SubCategory } | { success: false; error: string }
> {
  try {
    if (!name || name.trim().length === 0) {
      return { success: false, error: 'Subcategory name is required' };
    }

    if (!categoryId) {
      return { success: false, error: 'Category ID is required' };
    }

    const subCategory = await subcategoryService.createSubCategory(
      name,
      categoryId
    );
    return { success: true, data: subCategory };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to create subcategory',
    };
  }
}

export async function updateSubCategory(
  id: string,
  data: SubCategoryFormInput
): Promise<
  { success: true; data: SubCategory } | { success: false; error: string }
> {
  try {
    if (!id) {
      return { success: false, error: 'Subcategory ID is required' };
    }

    const subCategory = await subcategoryService.updateSubCategory(id, data);
    return { success: true, data: subCategory };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to update subcategory',
    };
  }
}

export async function deleteSubCategory(
  id: string
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    if (!id) {
      return { success: false, error: 'Subcategory ID is required' };
    }

    await subcategoryService.deleteSubCategory(id);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to delete subcategory',
    };
  }
}

export async function getSubCategories(
  categoryId: string,
  page: number = 1,
  limit: number = 10
): Promise<
  | {
      success: true;
      data: Awaited<ReturnType<typeof subcategoryService.getSubCategories>>;
    }
  | { success: false; error: string }
> {
  try {
    if (!categoryId) {
      return { success: false, error: 'Category ID is required' };
    }

    const result = await subcategoryService.getSubCategories(
      categoryId,
      page,
      limit
    );
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to fetch subcategories',
    };
  }
}
