'use client';

import { useRouter } from 'next/navigation';
import { useRole } from '@/hooks/useRole';
import { Card, Loader } from '@/ui';
import { ROUTES } from '@/lib/constants';

export default function AdminPage() {
  const router = useRouter();
  const { user, isLoading, isAdmin } = useRole();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!isAdmin || !user) {
    router.push(ROUTES.DASHBOARD);
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary-50 p-8">
      <div className="mx-auto max-w-4xl">
        <Card header={<h1 className="text-2xl font-bold">Admin Panel</h1>}>
          <p className="text-secondary-600">
            This is the admin-only area. Only users with the ADMIN role can
            access this page.
          </p>
        </Card>
      </div>
    </div>
  );
}

