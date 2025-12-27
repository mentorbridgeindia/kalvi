'use client';

import { ROUTES } from '@/lib/constants';
import { Button, Loader } from '@/ui';
import { useAuth } from '@workos-inc/authkit-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();
  const { user, isLoading, signIn, signUp } = useAuth();

  const handleLogout = () => {
    router.push(ROUTES.LOGOUT);
  };

  return (
    <header className="border-b border-secondary-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href={ROUTES.HOME}
          className="text-xl font-bold text-secondary-900"
        >
          Kalvi
        </Link>

        <nav className="flex items-center gap-4">
          {isLoading ? (
            <Loader size="sm" />
          ) : user ? (
            <>
              <Link
                href={ROUTES.DASHBOARD}
                className="text-sm font-medium text-secondary-700 hover:text-secondary-900"
              >
                Dashboard
              </Link>
              <span className="text-sm text-secondary-500">
                {user.firstName} {user.lastName}
              </span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => signIn()}>
                Login
              </Button>
              <Button variant="primary" onClick={() => signUp()}>
                Register
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
