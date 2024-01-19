import { Request, Response } from 'express';
import userModel from '../model/userModel';
import ExpenseModel from '../model/expenseModel';

// import settlementModel from '../model/settlementModel';

const madeExpense = async (req: Request, res: Response) => {

    try {

        const { purpose, amount, Type } = req.body;
        const username = req.params.username

        if (!purpose || !amount || !Type) {
            console.log("all fields are required ")
        }

        const user = await userModel.findOne({ username })
        if (!user) {
            console.log("user not exsist")
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (Type === "income" && user.amount !== undefined) {
            user.amount += amount;
            user.amountLeft += amount;
            await user.save();
        }
        if (Type == "expense" && user.amount !== undefined) {
            if (user.amount == 0 && user.amountLeft == 0) {
                console.log("insufficient balance")
            }
            user.amountLeft -= amount
            if (user.amountLeft < 0) {
                return res.status(400).json({
                    message: "Insufficient balance",
                });
            }

            await user.save()

        }
        const newExpense = new ExpenseModel({
            purpose,
            amount,
            Type,
            date: new Date(),
            user: user._id,
        });

        // Save the expense to the database
        const savedExpense = await newExpense.save();
        user.transactions.push(savedExpense._id)
        await user.save();
        await user.populate("transactions")
        res.json({
            user,
        });
        console.log(user)


    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

};

export default madeExpense;