import { WorkOS } from '@workos-inc/node';

if (!process.env.WORKOS_API_KEY) {
  throw new Error('WORKOS_API_KEY is not set');
}

if (!process.env.NEXT_PUBLIC_WORKOS_CLIENT_ID) {
  throw new Error('NEXT_PUBLIC_WORKOS_CLIENT_ID is not set');
}

export const workos = new WorkOS(process.env.WORKOS_API_KEY);

export const NEXT_PUBLIC_WORKOS_CLIENT_ID =
  process.env.NEXT_PUBLIC_WORKOS_CLIENT_ID;

export const NEXT_PUBLIC_WORKOS_REDIRECT_URI =
  process.env.NEXT_PUBLIC_WORKOS_REDIRECT_URI ||
  'http://localhost:8000/auth/callback';

export const WORKOS_CONNECTIONS = {
  EMAIL_PASSWORD: process.env.WORKOS_EMAIL_PASSWORD_CONNECTION_ID,
  GOOGLE: process.env.WORKOS_GOOGLE_CONNECTION_ID,
  MICROSOFT: process.env.WORKOS_MICROSOFT_CONNECTION_ID,
  GITHUB: process.env.WORKOS_GITHUB_CONNECTION_ID,
} as const;
