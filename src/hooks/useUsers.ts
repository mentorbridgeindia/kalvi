import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS, USER_ROLES, STATUS, type UserRole, type Status } from '@/lib/constants';
import * as userActions from '@/app/(admin)/actions/user.actions';

export function useUsers(page: number = 1, limit: number = 10) {
  return useQuery({
    queryKey: [...QUERY_KEYS.USERS, page, limit],
    queryFn: async () => {
      const result = await userActions.getUsers(page, limit);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: UserRole }) =>
      userActions.updateUserRole(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS });
    },
  });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: Status }) =>
      userActions.updateUserStatus(userId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS });
    },
  });
}

