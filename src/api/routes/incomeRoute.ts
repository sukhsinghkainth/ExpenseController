
import express, { Response } from 'express';
import ReqWithUser from '../../interfaces/Ireq';
import IncomeService from '../../services/incomeService';
import ExpenseService from '../../services/expenseService';

const router = express.Router();

router.post('/income' ,  async (req: ReqWithUser, res: Response) => {
    try {
      const { amount, type, notes, accountType, categoryName } = req.body;
  
      if (!amount || !type || !notes || !accountType || !categoryName) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      if (type !== 'income') {
        return res.status(400).json({ error: 'Type should be income' });
      }  

      const category =  await IncomeService.getcategoryId(categoryName)
      const account = await IncomeService.createAccount(req, accountType);
     
      category._id ? await IncomeService.createIncome(req, amount, notes, account.id, category._id , accountType) : "";

      res.status(200).json({ message: 'Income added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/total-income', async (req : ReqWithUser, res) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      const accounts = await IncomeService.getAccountsByUser(user.id);
      const transactions = await IncomeService.getTransactionsByAccounts(accounts);
      const totalIncome = transactions.reduce((acc: number, transaction: { amount: number; }) => acc + transaction.amount, 0);
  
      res.json({ totalIncome });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/expense', async (req: ReqWithUser, res: Response) => {
    try {
        const { amount, type, notes, accountType, categoryName } = req.body;
        if (!amount || !type || !notes || !accountType || !categoryName) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (type !== 'expense') {
            return res.status(400).json({ error: 'Type should be expense' });
        }

        await ExpenseService.createExpense(req, amount, notes, accountType, categoryName);

        res.status(200).json({ message: 'Expense added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;