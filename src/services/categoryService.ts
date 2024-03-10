
import category, { categoryType } from '../interfaces/ICategory';
import ReqWithUser from '../interfaces/Ireq';
import categoryModel from '../model/categoryModel';
import CategoryModel from '../model/categoryModel';
import transactionModel from '../model/transactionSchema';
import { categoryResponse } from '../response/categoryResponse';

export default class CategoryService {
  typeOfCategory(type: categoryType)
  {
    if(!(type in categoryType)){
      throw new Error("type should be expense or income")
       }
     return type
  }
  transformCategory(categories: category[]): categoryResponse[] {
    return categories.map(category => new categoryResponse(category.name, category.type));
  }
   async getAllCategories(type? : categoryType): Promise<category[]> {
  if(type){
    this.typeOfCategory(type)
  }
  const categories =   type ?  await categoryModel.find({ type }) : await categoryModel.find();
  const categoryRes  = this.transformCategory(categories);
  return categoryRes
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
    const ExistingTransatciton =  await transactionModel.find({category : category._id, user : req.user.id})

console.log(ExistingTransatciton.length)
      if(ExistingTransatciton.length > 0)
      {
        throw new Error(`THERE IS ALREADY A TRANSACTION ON ${name}` )
      }
      // await transactionModel.deleteMany({ category: category._id , user: req.user.id});
      // Delete the category itself
      await CategoryModel.findOneAndDelete({ name });
    } catch (error) {
      console.error(error);
      throw new Error(`${error}`);
    }
  }

  async createCategory(categoryData: category): Promise<category> {
    try {
      const { name } = categoryData;
      const existingCategory = await CategoryModel.findOne({ name : name});
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