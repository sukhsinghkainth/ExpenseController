import ReqWithUser from '../interfaces/Ireq';
import BudgetModel from '../model/budgetModel';
import transactionModel from '../model/transactionSchema';
import CategoryModel from '../model/categoryModel';
import category, { categoryType } from '../interfaces/ICategory';
import UserModel from '../model/userModel';
import budgetModel from '../model/budgetModel';
import { BudgetResponse } from '../response/budgetResponse';

class SetBudgetService {

    // set budget 
    
    static setBudget = async (req: ReqWithUser, categoryName: string, limit: number): Promise<void> => {
        try {
            if (!req.user) {
                throw new Error('User not authenticated');
            }
            const category = await SetBudgetService.getCategoryByName(categoryName);
            
            if (!category || category.type !== categoryType.expense) {
                throw new Error('Budget can only be set for expense categories or category not availiable');
            }
            const existingBudget = await BudgetModel.findOne({ user: req.user.id, category: category._id });
            if (existingBudget) {

                throw new Error("budget already exist ")
            } else {
                const newBudget = new BudgetModel({
                    user: req.user.id,
                    category: category._id,
                    limit,
                    remaininglimit: limit,
                });

                await newBudget.save();
                await UserModel.findByIdAndUpdate(req.user.id, { $addToSet: { budget: newBudget.id } });

            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // update budget

    static updateBudget = async (req: ReqWithUser, categoryName: string, limit: number): Promise<void> => {
        try {
          if (!req.user) {
            throw new Error("User not authenticated");
          }
      
          const category = await SetBudgetService.getCategoryByName(categoryName);
      
          if (!category || category.type !== categoryType.expense) {
            throw new Error("Budget can only be updated for expense categories or category not available");
          }
      
          const existingBudget = await BudgetModel.findOne({ user: req.user.id, category: category._id });
      
          if (!existingBudget) {
            throw new Error("Budget not found");
          }
      
          existingBudget.limit = limit;
          existingBudget.remaininglimit = limit;
    
          await existingBudget.save();
      
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
      //delete budget

      static deleteBudget = async (req: ReqWithUser, categoryName: string): Promise<void> => {
        try {
            if (!req.user) {
                throw new Error('User not authenticated')
            }

            const category = await SetBudgetService.getCategoryByName(categoryName)

            if (!category || category.type !== categoryType.expense) {
                throw new Error('Budget can only be deleted for expense categories or category not available')
            }

            const existingBudget = await BudgetModel.findOne({ user: req.user.id, category: category._id })

            if (!existingBudget) {
                throw new Error('Budget not found')
            }

            await BudgetModel.findOneAndDelete({ user: req.user.id, category: category._id })

            await UserModel.findByIdAndUpdate(req.user.id, { $pull: { budget: existingBudget.id }})

        } catch (error) {
            console.error(error)
            throw error
        }
    }

    
    private static async getCategoryByName(categoryName: string): Promise<category | null> {
        try {
            return await CategoryModel.findOne({ name: categoryName });
        } catch (error) {
            console.error(error);
            throw new Error('Error retrieving category');
        }
    }
    static async transformBudgets(budgets: any[]): Promise<BudgetResponse[]> {
     return budgets.map(budgets =>{
            const category = {
                name : budgets.category.name,
                type : budgets.category.type,

            };
            return new BudgetResponse(
            category,
            budgets.limit,
            budgets.spent,
            budgets.remaininglimit
            )
     })
      }
    static async viewBudget(req:ReqWithUser)
    {
        if(!req.user)
        {
            throw new Error("Unauthorized")
        }
        try {
        const budgets =  await budgetModel.find({user : req.user.id})
          .populate("category").exec()  
          return this.transformBudgets(budgets);
          
        } catch (error) {
            throw new Error(`error while fetching categories ${error}`)
        }
    }
}

export default SetBudgetService;