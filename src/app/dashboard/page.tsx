'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useRole } from '@/hooks/useRole';
import { Button, Card, Loader } from '@/ui';
import { ROUTES } from '@/lib/constants';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading, signOut } = useAuth();
  const { isAdmin } = useRole();

  const handleLogout = () => {
    signOut();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!user) {
    router.push(ROUTES.LOGIN);
    return null;
  }

  return (
    <div className="min-h-screen bg-secondary-50 p-8">
      <div className="mx-auto max-w-4xl">
        <Card
          header={<h1 className="text-2xl font-bold">Dashboard</h1>}
          footer={
            <div className="flex justify-between">
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
              {isAdmin && (
                <Button
                  variant="primary"
                  onClick={() => router.push(ROUTES.ADMIN)}
                >
                  Admin Panel
                </Button>
              )}
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <p className="text-sm text-secondary-600">Name</p>
              <p className="text-lg font-semibold">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-secondary-600">Email</p>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-secondary-600">Role</p>
              <p className="text-lg font-semibold">{user.role}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

