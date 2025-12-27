import { USER_ROLES, type UserRole } from '@/lib/constants';
import mongoose, { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  workosUserId: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    workosUserId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
    collection: 'User',
  }
);

export const User = model<IUser>('User', UserSchema, 'User');
