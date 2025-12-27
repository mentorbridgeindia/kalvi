import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth';
import { ROUTES } from '@/lib/constants';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/auth')) {
    return NextResponse.next();
  }

  if (pathname === ROUTES.HOME) {
    return NextResponse.next();
  }

  const session = await getSession();

  if (!session) {
    if (pathname.startsWith('/api')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  if (pathname.startsWith('/admin')) {
    if (session.role !== 'ADMIN') {
      return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

