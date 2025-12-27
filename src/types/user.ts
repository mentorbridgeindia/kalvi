import { USER_ROLES, STATUS, type UserRole, type Status } from '@/lib/constants';

export interface User {
  _id: string;
  workosUserId: string;
  email: string;
  name: string;
  role: UserRole;
  status: Status;
  createdAt: Date;
}

export interface SessionUser {
  userId: string;
  workosUserId: string;
  email: string;
  name: string;
  role: UserRole;
}

export const USER_ROLE_VALUES = Object.values(USER_ROLES);

