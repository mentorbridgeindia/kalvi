'use server';

import {
  STATUS,
  USER_ROLES,
  type Status,
  type UserRole,
} from '@/lib/constants';
import * as userService from '@/services/user.service';

export async function getUsers(
  page: number = 1,
  limit: number = 10
): Promise<
  | {
      success: true;
      data: Awaited<ReturnType<typeof userService.getUsers>>;
    }
  | { success: false; error: string }
> {
  try {
    const result = await userService.getUsers(page, limit);
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch users',
    };
  }
}

export async function updateUserRole(
  userId: string,
  role: UserRole
): Promise<
  | {
      success: true;
      data: Awaited<ReturnType<typeof userService.updateUserRole>>;
    }
  | { success: false; error: string }
> {
  try {
    if (!userId) {
      return { success: false, error: 'User ID is required' };
    }

    if (!Object.values(USER_ROLES).includes(role)) {
      return { success: false, error: 'Invalid role' };
    }

    const user = await userService.updateUserRole(
      userId,
      role,
    );
    return { success: true, data: user };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to update user role',
    };
  }
}

export async function updateUserStatus(
  userId: string,
  status: Status
): Promise<
  | {
      success: true;
      data: Awaited<ReturnType<typeof userService.updateUserStatus>>;
    }
  | { success: false; error: string }
> {
  try {
    if (!userId) {
      return { success: false, error: 'User ID is required' };
    }

    if (!Object.values(STATUS).includes(status)) {
      return { success: false, error: 'Invalid status' };
    }

    const user = await userService.updateUserStatus(
      userId,
      status,
    );
    return { success: true, data: user };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to update user status',
    };
  }
}
