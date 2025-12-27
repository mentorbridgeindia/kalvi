import {
  STATUS,
  USER_ROLES,
  type Status,
  type UserRole,
} from '@/lib/constants';
import connectDB from '@/lib/db';
import { User } from '@/models/User';
import type { User as UserType } from '@/types/user';

export async function getUsers(
  page: number = 1,
  limit: number = 10
): Promise<{
  data: UserType[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  await connectDB();

  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    User.find()
      .select('-workosUserId')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    User.countDocuments(),
  ]);

  return {
    data: data.map((user) => ({
      _id: user._id as string,
      workosUserId: user.workosUserId,
      email: user.email,
      name: user.name,
      role: user.role as UserRole,
      status: user.status as Status,
      createdAt: user.createdAt as Date,
    })),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function updateUserRole(
  userId: string,
  role: UserRole
): Promise<UserType> {
  await connectDB();

  if (!Object.values(USER_ROLES).includes(role)) {
    throw new Error('Invalid role');
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  user.role = role;
  await user.save();

  return {
    _id: user._id.toString(),
    workosUserId: user.workosUserId,
    email: user.email,
    name: user.name,
    role: user.role as UserRole,
    status: user.status,
    createdAt: user.createdAt,
  };
}

export async function updateUserStatus(
  userId: string,
  status: Status
): Promise<UserType> {
  await connectDB();

  if (!Object.values(STATUS).includes(status)) {
    throw new Error('Invalid status');
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  user.status = status;
  await user.save();

  return {
    _id: user._id.toString(),
    workosUserId: user.workosUserId,
    email: user.email,
    name: user.name,
    role: user.role as UserRole,
    status: user.status,
    createdAt: user.createdAt,
  };
}
