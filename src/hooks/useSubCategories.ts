import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import * as subcategoryActions from '@/app/(admin)/actions/subcategory.actions';
import type { SubCategoryFormInput } from '@/types/category';

export function useSubCategories(
  categoryId: string,
  page: number = 1,
  limit: number = 10
) {
  return useQuery({
    queryKey: [...QUERY_KEYS.SUBCATEGORIES, categoryId, page, limit],
    queryFn: async () => {
      const result = await subcategoryActions.getSubCategories(
        categoryId,
        page,
        limit
      );
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    enabled: !!categoryId,
  });
}

export function useCreateSubCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, categoryId }: { name: string; categoryId: string }) =>
      subcategoryActions.createSubCategory(name, categoryId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.SUBCATEGORIES, variables.categoryId],
      });
    },
  });
}

export function useUpdateSubCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: SubCategoryFormInput;
    }) => subcategoryActions.updateSubCategory(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SUBCATEGORIES,
      });
    },
  });
}

export function useDeleteSubCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => subcategoryActions.deleteSubCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SUBCATEGORIES });
    },
  });
}

