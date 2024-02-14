
import AccountModel from '../model/accountModel';
import TransactionModel from '../model/transactionSchema';
import CategoryModel from '../model/categoryModel';
import ReqWithUser from '../interfaces/Ireq';
import accounts, { AccountType } from '../interfaces/IAccount';
import transaction from '../interfaces/ITransactions';
import UserModel from '../model/userModel';
import category, { categoryType } from '../interfaces/ICategory';
import categoryModel from '../model/categoryModel';
import transactionModel from '../model/transactionSchema';
import { transactionResponse } from '../response/transactionResponse';
import { Types } from 'mongoose';
import { error } from 'console';

class IncomeService {
  static async transformTransactions(transactions: any[]): Promise<transactionResponse[]> {
    return transactions.map(transaction => {
      const account = {
        _id: transaction.account._id,
        accountType: transaction.account.accountType
      };
      const category = {
        name: transaction.category.name,
        type: transaction.category.type
      };
      return new transactionResponse(
        transaction.type,
        transaction._id,
        account,
        category,
        transaction.notes,
        transaction.date,
        transaction.amount
      );
    });
  }

  static async allTransactions(req: ReqWithUser, type?: categoryType): Promise<transactionResponse[]> {
    if (!req.user?.id) {
      throw new Error("unauthorized")
    }
    let query: Record<string, unknown> = { user: req.user.id }
    if (type) {
      if(!(type in categoryType)){
         throw new Error("type should be expense or income")
          }
      query = { user: req.user.id, type: type }
    }
    const transaction = await transactionModel.find(query)
      .populate({ path: 'category' })
      .populate({ path: 'account', select: 'accountType' })
      .exec()
    const transactionResponses = await IncomeService.transformTransactions(transaction);
    return transactionResponses;
  }

  static async getcategoryId(name: category): Promise<category> {
    if (!name) {
      throw new Error('Category name is required');
    }

    const category = await categoryModel.findOne({ name: name });

    if (!category || category.type !== categoryType.income) {
      return Promise.reject("invalid category")
    }
    return category
  }

  static async getAccountsByUser(id: Types.ObjectId): Promise<accounts[]> {
    return AccountModel.find({ users: id }).exec();
  }

  static async getTransactionsByAccounts(accounts: accounts[], type: categoryType): Promise<transaction[]> {
    const accountIds = accounts.map(account => account.id);
    return TransactionModel.find({ account: { $in: accountIds }, type: type }).exec();
  }

  static async createAccount(req: ReqWithUser, typeofAccount: AccountType): Promise<accounts> {
    const user = req.user;


    if (!user) {
      throw new Error("Unauthorized");
    }
    const existingAccount = await AccountModel.findOne({ users: user.id, accountType: typeofAccount });
    if (existingAccount) {
      return existingAccount;
    }

    const newAccount = new AccountModel({ users: user.id, accountType: typeofAccount });
    await newAccount.save();
    await UserModel.updateOne({ _id: user.id }, { $push: { "account": newAccount } })


    return newAccount;
  }

  static async createIncome(req: ReqWithUser, amount: number, notes: string, accountId: accounts["id"], categoryId: category["_id"], typeofAccount: AccountType, type: categoryType): Promise<transaction> {
    const user = req.user;
    if (!user || !user.id) {
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
      { users: user.id, accountType: typeofAccount },
      { $push: { transactions: newTransaction.id } }
    );



    const accounts = await IncomeService.getAccountsByUser(user.id);
    const transactions = await IncomeService.getTransactionsByAccounts(accounts, type);
    const totalIncome = transactions.reduce((acc: number, transaction: { amount: number; }) => acc + transaction.amount, 0);
    await UserModel.updateOne({ _id: user.id }, { $set: { "totalIncome": totalIncome } })


    return newTransaction;
  }
  static async allaccount(req: ReqWithUser, type?: AccountType): Promise<accounts[]> {
    try {
      if (!req.user) {
        throw new Error("Unauthorize")
      }
      let query: Record<string, unknown> = { users: req.user.id }
      if (type) {
        query = { users: req.user.id, accountType: type }
      }
      const accounts = await AccountModel.find(query).populate({ path: 'transactions', populate: { path: 'category' } }).exec()
      const transformedAccounts = await IncomeService.transformAccountResponse(accounts);
      return transformedAccounts;
    } catch (error: any) {
      console.log(error)
      throw new Error(error)
    }
  }
  static async transformAccountResponse(accounts: any[]): Promise<any[]> {
    return accounts.map(account => {
      const transactions = account.transactions.map((transaction: { amount: number; type: AccountType; notes: string; category: { name: string; type: categoryType; }; date: Date; account: accounts; }) => ({
        amount: transaction.amount,
        type: transaction.type,
        notes: transaction.notes,
        category: {
          name: transaction.category.name,
          type: transaction.category.type
        },
        date: transaction.date,
        account: transaction.account,

      }));
      return {

        accountType: account.accountType,
        transactions: transactions
      };
    });
  }

}

export default IncomeService; 