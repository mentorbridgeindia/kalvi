import Link from 'next/link';
import { Button } from '@/ui';
import { ROUTES } from '@/lib/constants';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-6 text-5xl font-bold text-secondary-900">
          Welcome to Kalvi
        </h1>
        <p className="mb-8 text-xl text-secondary-600">
          Enterprise-grade gamified e-learning platform
        </p>
        <Link href={ROUTES.LOGIN}>
          <Button variant="primary">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}

