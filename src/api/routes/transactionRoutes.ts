
import express, { Response } from 'express';
import ReqWithUser from '../../interfaces/Ireq';
import IncomeService from '../../services/incomeService';
import ExpenseService from '../../services/expenseService';
import { categoryType } from '../../interfaces/ICategory';
import { AccountType } from '../../interfaces/IAccount';

const router = express.Router();

// all transactions expense type transactions income type transactions 

router.get('/alltransaction/:categorytype?', async (req: ReqWithUser, res: Response) => {
  try {
    const { categorytype } = req.params;
    const transactions = await IncomeService.allTransactions(req, categorytype as categoryType)
    return res.json(transactions)
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: `An error occurred while trying to get the transactions ${error}` })
  }
})

// transaction of income or expense route

router.post('/transaction', async (req: ReqWithUser, res: Response) => {
  try {
    const { amount, type, notes, accountType, categoryName } = req.body;
    if (!amount || !type || !notes || !accountType || !categoryName) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (type === 'income') {
      const category = await IncomeService.getcategoryId(categoryName)
      const account = await IncomeService.createAccount(req, accountType);
      await IncomeService.createIncome(req, amount, notes, account.id, category._id, accountType, type);
      res.status(200).json({ message: 'Income added successfully' });
    }
    if (type === 'expense') {
      await ExpenseService.createExpense(req, amount, notes, accountType, categoryName, type);
      res.status(200).json({ message: 'Expense added successfully' });
    }
    else {
      res.status(404).json({ message: 'type should be income or expense' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error adding new transaction: ${error}` });
  }
});

// get all the accounts of the user like card, cash ,savings and their transactions as well

router.get('/account/:accounttype?', async (req: ReqWithUser, res: Response) => {
  try {
    const { accounttype } = req.params;
    if (accounttype) {
      const validAccountTypes = ['card', 'cash', 'savings'];
      if (validAccountTypes.includes(accounttype)) {
        const accounts = await IncomeService.allaccount(req, accounttype as AccountType);
        return res.json(accounts.length > 0 ? accounts : "No accounts found for the specified type");
      } else {
        return res.status(400).json("Account type must be card, cash, or savings");
      }
    } else {
      const allaccounts = await IncomeService.allaccount(req);
      return res.json(allaccounts.length > 0 ? allaccounts : "No accounts found");
    }
  } catch (error) {
    res.status(500).json({ error: `error while fetching account details ${(error as Error).message}` });
  }
});
export default router;