import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import * as categoryActions from '@/app/(admin)/actions/category.actions';
import type { Category, CategoryFormInput } from '@/types/category';

export function useCategories(page: number = 1, limit: number = 10) {
  return useQuery({
    queryKey: [...QUERY_KEYS.CATEGORIES, page, limit],
    queryFn: async () => {
      const result = await categoryActions.getCategories(page, limit);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => categoryActions.createCategory(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CATEGORIES });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CategoryFormInput }) =>
      categoryActions.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CATEGORIES });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoryActions.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CATEGORIES });
    },
  });
}

