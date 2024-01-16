import { Request, Response } from 'express';
import userModel from '../model/userModel';

 const getUserWithExpenses = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    // Find the user by userId and populate the expenses
    const userWithExpenses = await userModel.findById(userId).populate('expenses').exec();

    if (!userWithExpenses) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: userWithExpenses });
    console.log(userWithExpenses)
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default getUserWithExpenses
