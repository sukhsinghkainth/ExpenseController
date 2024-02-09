
import category, { categoryType } from '../interfaces/ICategory';
import CategoryModel from '../model/categoryModel';
import transactionModel from '../model/transactionSchema';

export default class CategoryService {

  async deleteCategory(name: string): Promise<void> {
    try {
      const category = await CategoryModel.findOne({ name });
      if (!category) {
        throw new Error('Category not found');
      }
      // Delete all transactions associated with the category
      await transactionModel.deleteMany({ category: category._id });

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