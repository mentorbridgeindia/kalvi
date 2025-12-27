import connectDB from '@/lib/db';
import { User } from '@/models/User';
import { USER_ROLES, type UserRole } from '@/lib/constants';
import type { SessionUser } from '@/types/user';

export async function findOrCreateUser(
  workosUserId: string,
  email: string,
  name: string
): Promise<SessionUser> {
  await connectDB();

  let user = await User.findOne({ workosUserId });

  if (!user) {
    user = await User.create({
      workosUserId,
      email,
      name,
      role: USER_ROLES.USER,
    });
  } else {
    if (user.email !== email || user.name !== name) {
      user.email = email;
      user.name = name;
      await user.save();
    }
  }

  return {
    userId: user._id.toString(),
    workosUserId: user.workosUserId,
    email: user.email,
    name: user.name,
    role: user.role as UserRole,
  };
}

export async function getUserByWorkosId(
  workosUserId: string
): Promise<SessionUser | null> {
  await connectDB();

  const user = await User.findOne({ workosUserId });

  if (!user) {
    return null;
  }

  return {
    userId: user._id.toString(),
    workosUserId: user.workosUserId,
    email: user.email,
    name: user.name,
    role: user.role as UserRole,
  };
}

export async function getUserRole(workosUserId: string): Promise<UserRole | null> {
  await connectDB();

  const user = await User.findOne({ workosUserId }).select('role');

  if (!user) {
    return null;
  }

  return user.role as UserRole;
}

