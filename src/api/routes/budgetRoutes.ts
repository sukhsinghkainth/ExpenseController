import express, { Response } from 'express';
import ReqWithUser from '../../interfaces/Ireq';
import setBudgetService from '../../services/budgetService';
import SetBudgetService from '../../services/budgetService';


const router = express.Router();

router.post('/setBudget', async (req: ReqWithUser, res: Response) => {
  try {
    const { categoryName, limit } = req.body;

    if (!categoryName || !limit) {
      return res.status(400).json({ error: 'Category ID and limit are required' });
    }

    await setBudgetService.setBudget(req, categoryName, limit);

    res.status(200).json({ message: 'Budget set successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error setting budget:${(error as Error).message}` });
  }
});
router.put('/updateBudget', async (req: ReqWithUser, res: Response) => {
  try {
    const { categoryName, limit } = req.body;

    if (!categoryName || !limit) {
      return res.status(400).json({ error: 'Category name and limit are required' });
    }

    await setBudgetService.updateBudget(req, categoryName, limit);

    res.status(200).json({ message: 'Budget updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error updating budget: ${(error as Error).message}` });
  }
});

// delete budget route 

router.delete('/deleteBudget/:categoryName', async (req: ReqWithUser, res: Response) => {
  try {
    const { categoryName } = req.params;
    if (!categoryName) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    await setBudgetService.deleteBudget(req, categoryName);

    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `${(error as Error).message}` });
  }
});

router.get('/view-budgets', async (req: ReqWithUser, res: Response) => {
  try {
    const allBudget = await SetBudgetService.viewBudget(req)
    // if all budget length got zero 
    if (allBudget.length == 0) {
      return res.json("budget not found")
    }
    return res.json({ budget: allBudget })
  } catch (error:any) {
    throw new Error(`Could not fetch budgets: ${error}`)
  }
})


export default router;