'use client';

import { useAuth } from './useAuth';
import { USER_ROLES, type UserRole } from '@/lib/constants';

export function useRole() {
  const { user, isLoading, isError } = useAuth();

  const isAdmin = user?.role === USER_ROLES.ADMIN;
  const isUser = user?.role === USER_ROLES.USER;
  const hasRole = (role: UserRole) => user?.role === role;

  return {
    user,
    isLoading,
    isError,
    isAuthenticated: !!user,
    isAdmin,
    isUser,
    hasRole,
  };
}

