// expenseService.ts
import { Request, Response } from 'express';
import userModel from '../model/userModel';
import ExpenseModel from '../model/expenseModel';


export const addSampleData = async (req: Request, res: Response) => {
  try {
    // Create a new user
    const newUser = new userModel({
      username: 'sukh',
      email: 'sukh@gmail.com',
      password: '123',
      overallBudget: 1000,
      budgetLeft: 800,
    });

    
    // Save the user
    const savedUser = await newUser.save();

    // Create a new expense
    const newExpense = new ExpenseModel({
      description: 'Sample Expense',
      amount: 200,
      date: new Date(),
      user: savedUser._id, // Reference the user
    });

    // Save the expense
    const savedExpense = await newExpense.save();

    // Update the user with the expense reference
    const updatedUser = await userModel.findByIdAndUpdate(
      savedUser._id,
      { $push: { expenses: savedExpense._id } },
      { new: true, useFindAndModify: false }
    ).populate('expenses');

    res.json({ user: updatedUser });
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export default addSampleData