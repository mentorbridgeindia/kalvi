'use client';

import { useAuth as useAuthKit } from '@workos-inc/authkit-react';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import type { SessionUser } from '@/types/user';

interface SessionResponse {
  user: SessionUser | null;
}

async function syncUserWithDatabase(workosUser: {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
}): Promise<SessionUser | null> {
  const response = await fetch('/api/auth/sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      workosUserId: workosUser.id,
      email: workosUser.email,
      name: workosUser.firstName && workosUser.lastName
        ? `${workosUser.firstName} ${workosUser.lastName}`
        : workosUser.firstName || workosUser.lastName || workosUser.email.split('@')[0],
    }),
  });

  if (!response.ok) {
    return null;
  }

  const data: SessionResponse = await response.json();
  return data.user;
}

export function useAuth() {
  const authKit = useAuthKit();
  const { user: workosUser, isLoading: authKitLoading } = authKit;

  const { data: sessionUser, isLoading: syncLoading } = useQuery({
    queryKey: [...QUERY_KEYS.AUTH_SESSION, workosUser?.id],
    queryFn: () => {
      if (!workosUser) return null;
      return syncUserWithDatabase(workosUser);
    },
    enabled: !!workosUser && !authKitLoading,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...authKit,
    isLoading: authKitLoading || syncLoading,
    user: sessionUser || null,
    workosUser,
  };
}

