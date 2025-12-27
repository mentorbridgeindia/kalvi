'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@workos-inc/authkit-react';
import { Loader } from '@/ui';
import { ROUTES } from '@/lib/constants';

export default function LogoutPage() {
  const router = useRouter();
  const { signOut, isLoading } = useAuth();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut();
        router.push(ROUTES.HOME);
      } catch (error) {
        console.error('Logout error:', error);
        router.push(ROUTES.HOME);
      }
    };

    if (!isLoading) {
      handleLogout();
    }
  }, [signOut, isLoading, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Loader size="lg" />
        <p className="mt-4 text-sm text-secondary-600">Signing out...</p>
      </div>
    </div>
  );
}

