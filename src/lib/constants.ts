export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  LOGIN: '/auth/login',
  CALLBACK: '/auth/callback',
  LOGOUT: '/logout',
  DASHBOARD: '/dashboard',
  ADMIN: '/admin',
} as const;

export const AUTH_PROVIDERS = {
  EMAIL_PASSWORD: 'email_password',
  GOOGLE: 'google',
  MICROSOFT: 'microsoft',
  GITHUB: 'github',
} as const;

export type AuthProvider = (typeof AUTH_PROVIDERS)[keyof typeof AUTH_PROVIDERS];

export const SESSION_COOKIE_NAME = 'kalvi_session';

export const STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];

export const QUERY_KEYS = {
  AUTH_SESSION: ['auth', 'session'] as const,
  CATEGORIES: ['admin', 'categories'] as const,
  SUBCATEGORIES: ['admin', 'subcategories'] as const,
  USERS: ['admin', 'users'] as const,
} as const;

export const ADMIN_EMAIL = 'senthilkumar@mentorbridge.in';