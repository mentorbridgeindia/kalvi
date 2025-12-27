import connectDB from '@/lib/db';
import { SubCategory } from '@/models/SubCategory';
import { Category } from '@/models/Category';
import { STATUS, type Status } from '@/lib/constants';
import type { SubCategory as SubCategoryType } from '@/types/category';

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function createSubCategory(
  name: string,
  categoryId: string
): Promise<SubCategoryType> {
  await connectDB();

  if (!name || name.trim().length === 0) {
    throw new Error('Subcategory name is required');
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new Error('Category not found');
  }

  const slug = generateSlug(name);
  const existingSubCategory = await SubCategory.findOne({ slug });

  if (existingSubCategory) {
    throw new Error('Subcategory with this name already exists');
  }

  const subCategory = await SubCategory.create({
    name: name.trim(),
    slug,
    categoryId,
    status: STATUS.ACTIVE,
  });

  return {
    _id: subCategory._id.toString(),
    name: subCategory.name,
    slug: subCategory.slug,
    categoryId: subCategory.categoryId.toString(),
    status: subCategory.status,
    createdAt: subCategory.createdAt,
  };
}

export async function updateSubCategory(
  id: string,
  data: Partial<Pick<SubCategoryType, 'name' | 'status' | 'categoryId'>>
): Promise<SubCategoryType> {
  await connectDB();

  const subCategory = await SubCategory.findById(id);

  if (!subCategory) {
    throw new Error('Subcategory not found');
  }

  if (data.categoryId !== undefined) {
    const category = await Category.findById(data.categoryId);

    if (!category) {
      throw new Error('Category not found');
    }

    subCategory.categoryId = data.categoryId as any;
  }

  if (data.name !== undefined) {
    if (!data.name || data.name.trim().length === 0) {
      throw new Error('Subcategory name is required');
    }

    const slug = generateSlug(data.name);
    const existingSubCategory = await SubCategory.findOne({
      slug,
      _id: { $ne: id },
    });

    if (existingSubCategory) {
      throw new Error('Subcategory with this name already exists');
    }

    subCategory.name = data.name.trim();
    subCategory.slug = slug;
  }

  if (data.status !== undefined) {
    subCategory.status = data.status;
  }

  await subCategory.save();

  return {
    _id: subCategory._id.toString(),
    name: subCategory.name,
    slug: subCategory.slug,
    categoryId: subCategory.categoryId.toString(),
    status: subCategory.status,
    createdAt: subCategory.createdAt,
  };
}

export async function deleteSubCategory(id: string): Promise<void> {
  await connectDB();

  const subCategory = await SubCategory.findById(id);

  if (!subCategory) {
    throw new Error('Subcategory not found');
  }

  await SubCategory.findByIdAndDelete(id);
}

export async function getSubCategories(
  categoryId: string,
  page: number = 1,
  limit: number = 10
): Promise<{
  data: SubCategoryType[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  await connectDB();

  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    SubCategory.find({ categoryId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    SubCategory.countDocuments({ categoryId }),
  ]);

  return {
    data: data.map((subCategory) => ({
      _id: subCategory._id.toString(),
      name: subCategory.name,
      slug: subCategory.slug,
      categoryId: subCategory.categoryId.toString(),
      status: subCategory.status as Status,
      createdAt: subCategory.createdAt,
    })),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getSubCategoryById(
  id: string
): Promise<SubCategoryType | null> {
  await connectDB();

  const subCategory = await SubCategory.findById(id).lean();

  if (!subCategory) {
    return null;
  }

  return {
    _id: subCategory._id.toString(),
    name: subCategory.name,
    slug: subCategory.slug,
    categoryId: subCategory.categoryId.toString(),
    status: subCategory.status as Status,
    createdAt: subCategory.createdAt,
  };
}

