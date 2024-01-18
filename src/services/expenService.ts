// expenseService.ts
import { Request, Response } from 'express';
import userModel from '../model/userModel';
import ExpenseModel from '../model/expenseModel';
import settlementModel from '../model/settlementModel';

export const addSampleData = async (req: Request, res: Response) => {
  try {
    // Create a new user
    const newUser = new userModel({
      username: 'mika singh',
      email: 'mika@gmail.com',
      overallBudget: 500,
      amountLeft: 300,
    });

    
    // Save the user
    const savedUser = await newUser.save();

    // Create a new expense
    const newExpense = new ExpenseModel({
      purpose: 'buying apple',
      amount: 200,
      date: new Date(),
      user: savedUser._id,
       // Reference the user
    });

    // Save the expense
    const savedExpense = await newExpense.save();

    const settlement = new settlementModel({
        amount: 200,
        data: 200,
        user: savedUser._id,
        status : "settled"
    })
    const savedsettlement = await settlement.save()

    // Update the user with the expense reference
    const updatedUser = await userModel.findById(
      savedUser._id,
  )
    res.json({ user: updatedUser });
    console.log(updatedUser)
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export default addSampleData