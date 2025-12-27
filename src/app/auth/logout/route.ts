import { NextRequest, NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/auth';
import { ROUTES } from '@/lib/constants';

export async function POST(request: NextRequest) {
  await clearSessionCookie();

  return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
}

