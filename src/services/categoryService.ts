
import category, { categoryType } from '../interfaces/ICategory';
import ReqWithUser from '../interfaces/Ireq';
import categoryModel from '../model/categoryModel';
import CategoryModel from '../model/categoryModel';
import transactionModel from '../model/transactionSchema';
import { categoryResponse } from '../response/categoryResponse';

export default class CategoryService {
  transformCategory(categories: category[]): categoryResponse[] {
    return categories.map(category => new categoryResponse(category.name, category.type));
  }
  async getAllCategories(): Promise<category[]> {
    return await categoryModel.find()
}
  async deleteCategory( req: ReqWithUser,name: string): Promise<void> {
    if(!req.user?.id)
    {
      throw new Error("not Authenticate")
    }
    try {
      const category = await CategoryModel.findOne({ name });
      if (!category) {
        throw new Error('Category not found');
      }
      // Delete all transactions associated with the category
      await transactionModel.deleteMany({ category: category._id , user: req.user.id});

      // Delete the category itself
      await CategoryModel.findOneAndDelete({ name });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete category');
    }
  }

  async createCategory(categoryData: category): Promise<category> {
    try {
      const { name } = categoryData;
      const existingCategory = await CategoryModel.findOne({ name });
      if (existingCategory) {
        throw new Error('category already exists');
      }
      const newCategory = new CategoryModel(categoryData);
      return newCategory.save();
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error('Failed to create category'));
    }
  }
  async updateCategory(name: string, categoryData: category): Promise<category> {
    try {
      const existingCategory = await CategoryModel.findOne({ name });
      if (!existingCategory) {
        throw new Error('Category not found');
      }

      const updatedCategory = await CategoryModel.findOneAndUpdate(
        { name },
        { $set: categoryData },
        { new: true, upsert: true }
      );
      return updatedCategory;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update category');
    }
  }
}