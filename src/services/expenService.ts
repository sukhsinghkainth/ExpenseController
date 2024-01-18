// expenseService.ts
import { Request, Response } from 'express';
import userModel from '../model/userModel';
import ExpenseModel from '../model/expenseModel';
import settlementModel from '../model/settlementModel';

export const addSampleData = async (req: Request, res: Response) => {
  try {
    // Create a new user
    const newUser = new userModel({
      username: 'sika singh',
      email: 'sikaa@gmail.com',
      overallBudget: 500,
      amountLeft: 400,
    });


    // Save the user
    const savedUser = await newUser.save();

    // Create a new expense
    const newExpense = new ExpenseModel({
      purpose: 'buying orange',
      amount: 100,
      date: new Date(),
      user: savedUser._id,
      // Reference the user
    });

    // Save the expense
    const savedExpense = await newExpense.save();

    const settlement = new settlementModel({
      amount: 100,
      data: 100,
      user: savedUser._id,
      status: "settled"
    })
    const savedsettlement = await settlement.save()

    // Update the user with the expense reference
    const updatedUser = await userModel.findByIdAndUpdate(
      savedUser._id,
      {
        $push: { expenses: savedExpense._id, settlements: savedsettlement._id },

      },
      { new: true, usefindAndModify: false }

    ).populate("expenses settlements").exec()
    res.json({ user: updatedUser });
    console.log(updatedUser)
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export default addSampleData