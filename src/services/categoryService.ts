
import category, { categoryType } from '../interfaces/ICategory';
import CategoryModel from '../model/categoryModel';

export default class CategoryService {
  
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
   async updateCategory(name: string, categoryData : category ): Promise<category> {
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