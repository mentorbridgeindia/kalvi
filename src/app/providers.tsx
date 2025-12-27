'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthKitProvider } from '@workos-inc/authkit-react';
import { useState } from 'react';

const NEXT_PUBLIC_WORKOS_CLIENT_ID =
  process.env.NEXT_PUBLIC_WORKOS_CLIENT_ID || '';

const NEXT_PUBLIC_WORKOS_REDIRECT_URI =
  process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI ||
  (typeof window !== 'undefined'
    ? `${window.location.origin}/auth/callback`
    : '');

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthKitProvider
        redirectUri={NEXT_PUBLIC_WORKOS_REDIRECT_URI}
        clientId={NEXT_PUBLIC_WORKOS_CLIENT_ID}
        devMode={process.env.NODE_ENV === 'development'}
      >
        {children}
      </AuthKitProvider>
    </QueryClientProvider>
  );
}
