import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/lib/constants';
import type { SessionUser } from '@/types/user';
import { getUserByWorkosId } from '@/services/auth.service';

export interface SessionData {
  workosUserId: string;
  role: string;
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie?.value) {
    return null;
  }

  try {
    const sessionData: SessionData = JSON.parse(sessionCookie.value);

    if (!sessionData.workosUserId) {
      return null;
    }

    const user = await getUserByWorkosId(sessionData.workosUserId);

    if (!user) {
      return null;
    }

    if (user.role !== sessionData.role) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<SessionUser> {
  const session = await getSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  return session;
}

export async function requireAdmin(): Promise<SessionUser> {
  const session = await requireAuth();

  if (session.role !== 'ADMIN') {
    throw new Error('Forbidden');
  }

  return session;
}

export async function setSessionCookie(sessionData: SessionData): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

