import { NextRequest, NextResponse } from 'next/server';
import { findOrCreateUser } from '@/services/auth.service';
import type { SessionUser } from '@/types/user';

interface SyncRequest {
  workosUserId: string;
  email: string;
  name: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SyncRequest = await request.json();

    if (!body.workosUserId || !body.email || !body.name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const sessionUser = await findOrCreateUser(
      body.workosUserId,
      body.email,
      body.name
    );

    return NextResponse.json({ user: sessionUser }, { status: 200 });
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync user' },
      { status: 500 }
    );
  }
}

