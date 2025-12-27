import { STATUS, type Status } from '@/lib/constants';
import mongoose, { Document, Schema, model } from 'mongoose';

export interface ISubCategory extends Document {
  name: string;
  slug: string;
  categoryId: mongoose.Types.ObjectId;
  status: Status;
  createdAt: Date;
}

const SubCategorySchema = new Schema<ISubCategory>(
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
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
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
    collection: 'SubCategory',
  }
);

export const SubCategory =
  mongoose.models.SubCategory ||
  model<ISubCategory>('SubCategory', SubCategorySchema, 'SubCategory');
