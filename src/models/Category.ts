import { STATUS, type Status } from '@/lib/constants';
import mongoose, { Document, Schema, model } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  status: Status;
  createdAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.ACTIVE,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
    collection: 'Category',
  }
);

export const Category =
  mongoose.models.Category ||
  model<ICategory>('Category', CategorySchema, 'Category');
