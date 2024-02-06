import express, { Request, Response } from 'express';
import ReqWithUser from '../../interfaces/Ireq';
import isAuth from './middlewares/isAuth';
import setBudgetService from '../../services/budgetService';
// import setBudgetService from '../../services/setBudgetService';
// import BudgetModel from '../../model/budgetModel';
// import { isAuth } from '../../middlewares/isAuth';

const router = express.Router();

router.post('/setBudget', async (req: ReqWithUser, res: Response) => {
  try {
    const { categoryId, limit } = req.body;

    if (!categoryId || !limit) {
      return res.status(400).json({ error: 'Category ID and limit are required' });
    }

    await setBudgetService.setBudget(req, categoryId, limit);

    res.status(200).json({ message: 'Budget set successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;