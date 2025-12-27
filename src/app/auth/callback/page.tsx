'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@workos-inc/authkit-react';
import { Loader } from '@/ui';
import { ROUTES } from '@/lib/constants';

export default function CallbackPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      console.log('user', user);
      if (user) {
        console.log('pushing to dashboard');
        router.push(ROUTES.DASHBOARD);
      } else {
        console.log('pushing to login');
        router.push(ROUTES.LOGIN);
      }
    } else {
      console.log('isLoading', isLoading);
    }
  }, [user, isLoading, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Loader size="lg" />
        <p className="mt-4 text-sm text-secondary-600">
          Completing authentication...
        </p>
      </div>
    </div>
  );
}
