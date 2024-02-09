
import AccountModel from '../model/accountModel';
import TransactionModel from '../model/transactionSchema';
import CategoryModel from '../model/categoryModel';
import ReqWithUser from '../interfaces/Ireq';
import accounts, { AccountType } from '../interfaces/IAccount';
import transaction from '../interfaces/ITransactions';
import UserModel from '../model/userModel';
import category, { categoryType } from '../interfaces/ICategory';
import categoryModel from '../model/categoryModel';

class IncomeService {
      
     static async getcategoryId(name : category):Promise<category>{
      if (!name) {
        throw new Error('Category name is required');
      }

      const category = await categoryModel.findOne({ name: name });
  
      if (!category || category.type !== 'income') {
        return Promise.reject("invalid category")
      }
       return category
     }

    static async getAccountsByUser(userId: string): Promise<accounts[]> {
        return AccountModel.find({ users: userId }).exec();
      }
    
      static async getTransactionsByAccounts(accounts: accounts[] , type : categoryType): Promise<transaction[]> {
        const accountIds = accounts.map(account => account.id);
        return TransactionModel.find({ account: { $in: accountIds }, type: type }).exec();
      }

  static async createAccount(req: ReqWithUser, typeofAccount: AccountType): Promise<accounts> {
    const user = req.user ;

    
    if(!user)
    {
        throw new Error("Unauthorized");
    }
    const existingAccount = await AccountModel.findOne({ users: user.id, accountType: typeofAccount });
    if (existingAccount) {
      return existingAccount;
    }

    const newAccount = new AccountModel({ users: user.id, accountType: typeofAccount });
    await newAccount.save();
   await UserModel.updateOne({ _id : user.id},{ $push:{ "account": newAccount  } })


    return newAccount;
  }

  static async createIncome(req: ReqWithUser, amount: number, notes: string, accountId: string, categoryId: string , typeofAccount : AccountType , type : categoryType): Promise<transaction> {
    const user = req.user ;
    if(!user)
    {
        throw new Error("Unauthorized");
    }
    const account = await AccountModel.findById(accountId);
    const category = await CategoryModel.findById(categoryId);

    if (!account || !category) {
      throw new Error('Invalid account or category');
    }

    const newTransaction = new TransactionModel({
      user: user.id, 
      amount: amount,
      notes: notes,
      account: account.id,
      category: category.id,
      type: 'income',
    });

    await newTransaction.save();
    await AccountModel.updateOne(
        { users: user.id, accountType: typeofAccount},
        { $push: { transactions: newTransaction.id } }
      );


    
      const accounts = await IncomeService.getAccountsByUser(user.id);
      const transactions = await IncomeService.getTransactionsByAccounts(accounts , type );
      const totalIncome = transactions.reduce((acc: number, transaction: { amount: number; }) => acc + transaction.amount, 0);
      await UserModel.updateOne({ _id : user.id},{ $set:{ "totalIncome": totalIncome  } })

    
    return newTransaction;
  }
}

export default IncomeService; 