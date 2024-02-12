
import express, {  Response } from 'express';
import ReqWithUser from '../../interfaces/Ireq';
import IncomeService from '../../services/incomeService';
import ExpenseService from '../../services/expenseService';
import { categoryType } from '../../interfaces/ICategory';
import Account from '../../model/accountModel';
import { AccountType } from '../../interfaces/IAccount';

const router = express.Router();

router.get('/all-expense-transaction', async (req: ReqWithUser, res:Response) => {
  try {
    // get all transaction 
 const type = categoryType.expense
 const transactions = await IncomeService.allTransactions(req, type);
  return   res.json(transactions)
    
  } catch (error) {
    console.error(error)
  }
})
router.get('/all-income-transaction', async (req: ReqWithUser, res:Response) => {
  try {
    // get all transaction 
 const type = categoryType.income
 const transactions = await IncomeService.allTransactions(req, type);

  return   res.json(transactions)
    
  } catch (error) {
    console.error(error)
  }
})
router.get('/alltransaction', async (req: ReqWithUser, res:Response) => {
  try {
    // get all transaction 
 const transactions = await IncomeService.allTransactions(req);

  return   res.json(transactions)
    
  } catch (error) {
    console.error(error)
  }
})
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
     
     await IncomeService.createIncome(req, amount, notes, account.id, category._id , accountType , type) ;

      res.status(200).json({ message: 'Income added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
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

        await ExpenseService.createExpense(req, amount, notes, accountType, categoryName, type);

        res.status(200).json({ message: 'Expense added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/accounts', async (req : ReqWithUser, res: Response)=>{
try {
  const allaccounts =  await  IncomeService.allaccount(req)

  
 return allaccounts ? res.json(allaccounts) : res.json("account not found")

} catch (error) {
    console.error(error);
        res.status(500).json({ error: `Internal Server Error ${error}` });
}
   
})
router.get('/cash-transactions', async (req : ReqWithUser, res: Response)=>{
  try {
    const type = AccountType.CASH
    const allaccounts =  await  IncomeService.allaccount(req,type)
    return allaccounts.length != 0 ? res.json(allaccounts) : res.json(`${type}  account is empty`)
    
  } catch (error) {
      console.error(error);
          res.status(500).json({ error: `Internal Server Error ${error}` });
  }
     
  })
  router.get('/savings-transactions', async (req : ReqWithUser, res: Response)=>{
    try {
     const type = AccountType.SAVINGS
      const allaccounts =  await  IncomeService.allaccount(req,type)
  
      
      return allaccounts.length != 0 ? res.json(allaccounts) : res.json(`${type}  account is empty`)
    
    } catch (error) {
        console.error(error);
            res.status(500).json({ error: `Internal Server Error ${error}` });
    }
       
    })
    router.get('/card-transactions', async (req : ReqWithUser, res: Response)=>{
      try {
        const type = AccountType.CARD
        const allaccounts =  await  IncomeService.allaccount(req,type)
      
        return allaccounts.length != 0 ? res.json(allaccounts) : res.json(`${type}  account is empty`)
    
      } catch (error) {
          console.error(error);
              res.status(500).json({ error: `Internal Server Error ${error}` });
      }
         
      })


export default router;