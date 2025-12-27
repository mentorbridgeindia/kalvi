'use client';

import {
  EnvelopeIcon,
  ShieldCheckIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import { useAuth } from '@workos-inc/authkit-react';
import { useRouter } from 'next/navigation';
import { ADMIN_EMAIL, ROUTES } from '../../lib/constants';
import { Button, Card } from '../../ui';
import { Loader } from '../../ui/loader';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const isAdmin = user?.email === ADMIN_EMAIL;

  const handleLogout = () => {
    router.push(ROUTES.LOGOUT);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
        <Loader size="lg" />
      </div>
    );
  }

  if (!user) {
    router.push(ROUTES.LOGIN);
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 py-10 flex flex-col items-center">
      <Card
        className="w-full max-w-4xl shadow-xl p-2"
        header={
          <div className="flex items-center gap-3">
            <UserIcon className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold tracking-tight text-secondary-900">
              Welcome, {user.firstName}!
            </h1>
          </div>
        }
        footer={
          <div className="flex justify-between gap-4 pt-4">
            {isAdmin && (
              <Button
                variant="primary"
                onClick={() => router.push(ROUTES.ADMIN)}
                className="flex items-center gap-2"
              >
                <ShieldCheckIcon className="w-5 h-5" /> Admin Panel
              </Button>
            )}
          </div>
        }
      >
        <div className="grid gap-8 md:grid-cols-2 pt-4">
          <div className="flex flex-col gap-2 bg-primary-50 rounded-lg p-5">
            <div className="flex items-center gap-2">
              <UserIcon className="w-6 h-6 text-primary-400" />
              <span className="uppercase text-xs text-primary-700 font-semibold tracking-wider">
                Name
              </span>
            </div>
            <span className="text-xl font-semibold text-secondary-900">
              {user.firstName} {user.lastName}
            </span>
          </div>
          <div className="flex flex-col gap-2 bg-primary-50 rounded-lg p-5">
            <div className="flex items-center gap-2">
              <EnvelopeIcon className="w-6 h-6 text-primary-400" />
              <span className="uppercase text-xs text-primary-700 font-semibold tracking-wider">
                Email
              </span>
            </div>
            <span className="text-xl font-semibold text-secondary-900">
              {user.email}
            </span>
          </div>
          <div className="flex flex-col gap-2 bg-primary-50 rounded-lg p-5 col-span-full md:col-span-1">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-6 h-6 text-primary-400" />
              <span className="uppercase text-xs text-primary-700 font-semibold tracking-wider">
                Role
              </span>
            </div>
            <span
              className={`text-xl font-semibold ${isAdmin ? 'text-amber-600' : 'text-green-600'}`}
            >
              {isAdmin ? 'ADMIN' : 'USER'}
            </span>
          </div>
          <div className="flex flex-col justify-center gap-4 bg-transparent md:col-span-1">
            <div className="rounded-lg bg-secondary-100 px-4 py-4 text-center shadow-inner">
              <p className="mb-1 font-semibold text-secondary-700 text-lg">
                What would you like to do next?
              </p>
              <div className="flex flex-col gap-3 mt-2">
                <Button
                  variant="primary"
                  onClick={() => router.push(ROUTES.HOME)}
                >
                  Go to Home
                </Button>
                {isAdmin && (
                  <Button
                    variant="secondary"
                    onClick={() => router.push(ROUTES.ADMIN)}
                  >
                    Access Admin Panel
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
