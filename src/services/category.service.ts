import connectDB from '@/lib/db';
import { Category } from '@/models/Category';
import { STATUS, type Status } from '@/lib/constants';
import type { Category as CategoryType } from '@/types/category';

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function createCategory(name: string): Promise<CategoryType> {
  await connectDB();

  if (!name || name.trim().length === 0) {
    throw new Error('Category name is required');
  }

  const slug = generateSlug(name);
  const existingCategory = await Category.findOne({ slug });

  if (existingCategory) {
    throw new Error('Category with this name already exists');
  }

  const category = await Category.create({
    name: name.trim(),
    slug,
    status: STATUS.ACTIVE,
  });

  return {
    _id: category._id.toString(),
    name: category.name,
    slug: category.slug,
    status: category.status,
    createdAt: category.createdAt,
  };
}

export async function updateCategory(
  id: string,
  data: Partial<Pick<CategoryType, 'name' | 'status'>>
): Promise<CategoryType> {
  await connectDB();

  const category = await Category.findById(id);

  if (!category) {
    throw new Error('Category not found');
  }

  if (data.name !== undefined) {
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('Category name is required');
    }

    const slug = generateSlug(data.name);
    const existingCategory = await Category.findOne({
      slug,
      _id: { $ne: id },
    });

    if (existingCategory) {
      throw new Error('Category with this name already exists');
    }

    category.name = data.name.trim();
    category.slug = slug;
  }

  if (data.status !== undefined) {
    category.status = data.status;
  }

  await category.save();

  return {
    _id: category._id.toString(),
    name: category.name,
    slug: category.slug,
    status: category.status,
    createdAt: category.createdAt,
  };
}

export async function deleteCategory(id: string): Promise<void> {
  await connectDB();

  const category = await Category.findById(id);

  if (!category) {
    throw new Error('Category not found');
  }

  await Category.findByIdAndDelete(id);
}

export async function getCategories(
  page: number = 1,
  limit: number = 10
): Promise<{
  data: CategoryType[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  await connectDB();

  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    Category.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Category.countDocuments(),
  ]);

  return {
    data: data.map((category) => ({
      _id: category._id.toString(),
      name: category.name,
      slug: category.slug,
      status: category.status as Status,
      createdAt: category.createdAt,
    })),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getCategoryById(id: string): Promise<CategoryType | null> {
  await connectDB();

  const category = await Category.findById(id).lean();

  if (!category) {
    return null;
  }

  return {
    _id: category._id.toString(),
    name: category.name,
    slug: category.slug,
    status: category.status as Status,
    createdAt: category.createdAt,
  };
}

export async function getCategoryBySlug(
  slug: string
): Promise<CategoryType | null> {
  await connectDB();

  const category = await Category.findOne({ slug }).lean();

  if (!category) {
    return null;
  }

  return {
    _id: category._id.toString(),
    name: category.name,
    slug: category.slug,
    status: category.status as Status,
    createdAt: category.createdAt,
  };
}

