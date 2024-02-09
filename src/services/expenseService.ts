import { AccountType } from "../interfaces/IAccount";
import transaction from "../interfaces/ITransactions";
import ReqWithUser from "../interfaces/Ireq";
import Account from "../model/accountModel";
import budgetModel from "../model/budgetModel";
import categoryModel from "../model/categoryModel";
import transactionModel from "../model/transactionSchema";
import UserModel from "../model/userModel";
import IncomeService from "./incomeService";

class ExpenseService {
    static async createExpense(req: ReqWithUser, amount: number, notes: string, accountType: AccountType, categoryName: string): Promise<transaction> {
        try {
            const { user } = req;
            if (!user) {
                throw new Error('Unauthorized');
            }

            // Check if category type is expense
            const category = await categoryModel.findOne({ name: categoryName, type: 'expense' });
            if (!category) {
                throw new Error('Invalid category');
            }

            // Check if budget exists for the category
            const budget = await budgetModel.findOne({ category: category._id, user: user.id });
            if (budget) {
                // Update the budget
                budget.spent += Number(amount);
                budget.remaininglimit -= Number(amount);
                await budget.save();
            }

            // Create or use existing account
            const account = await IncomeService.createAccount(req, accountType);

            // Create the transaction
            const newTransaction = new transactionModel({
                user: user.id,
                amount,
                type: 'expense',
                account: account.id,
                category: category._id,
                notes,
            });
            await newTransaction.save();

            // Update user's account and transaction
            await UserModel.findByIdAndUpdate(user.id, { $addToSet: { account: account.id, transactions: newTransaction.id } });

            // Update account with user
            await Account.findByIdAndUpdate(account.id, { $addToSet: { users: user.id } });

            return newTransaction;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to create expense transaction');
        }
    }
}

export default ExpenseService;