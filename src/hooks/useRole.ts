import { ADMIN_EMAIL, QUERY_KEYS } from '@/lib/constants';
import type { SessionUser } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

interface UseRoleResponse {
  user: SessionUser | null;
  isLoading: boolean;
  isAdmin: boolean;
}

export function useRole(): UseRoleResponse {
  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.AUTH_SESSION,
    queryFn: async () => {
      const response = await fetch('/api/auth/session');
      if (!response.ok) {
        throw new Error('Failed to fetch session');
      }
      const result = await response.json();
      return result.user as SessionUser | null;
    },
  });

  const user = data ?? null;
  const isAdmin = user?.email === ADMIN_EMAIL;

  return {
    user,
    isLoading,
    isAdmin,
  };
}
