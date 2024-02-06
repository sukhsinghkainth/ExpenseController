import ReqWithUser from '../interfaces/Ireq';
import BudgetModel from '../model/budgetModel';
import transactionModel from '../model/transactionSchema';
import CategoryModel from '../model/categoryModel';
import category, { categoryType } from '../interfaces/ICategory';

class SetBudgetService {
  static setBudget = async (req: ReqWithUser, categoryName: string, limit: number): Promise<void> => {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }

      const category = await SetBudgetService.getCategoryByName(categoryName);
      if (!category || category.type !== categoryType.expense) {
        throw new Error('Budget can only be set for expense categories or category not availiable');
      }

      const existingBudget = await BudgetModel.findOne({ user: req.user._id, category: category._id });

      let remainingLimit = limit;

      if (existingBudget) {
        const transactions = await transactionModel.find({
          category: category._id,
          user: req.user._id,
        });

        remainingLimit -= await SetBudgetService.getSpentAmount(transactions);

        existingBudget.limit = limit;
        existingBudget.remaininglimit = remainingLimit;
        await existingBudget.save();
      } else {
        const newBudget = new BudgetModel({
          user: req.user._id,
          category: category._id,
          limit,
          remaininglimit: limit,
        });

        await newBudget.save();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  private static async getSpentAmount(transactions: any[]): Promise<number> {
    return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  }

  private static async getCategoryByName(categoryName: string): Promise<category | null> {
    try {
      return await CategoryModel.findOne({ name: categoryName });
    } catch (error) {
      console.error(error);
      throw new Error('Error retrieving category');
    }
  }
}

export default SetBudgetService;