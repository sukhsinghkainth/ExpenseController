import { Request, Response } from 'express';
import userModel from '../model/userModel';
import ExpenseModel from '../model/expenseModel';

// import settlementModel from '../model/settlementModel';

const madeExpense = async (req: Request, res: Response) => {

    try { 

        const {purpose , amount , status} = req.body;
        const username = req.params.username
 
        if(!purpose || !amount  || !status){
console.log("all fields are required ")
        }
        
        const user = await userModel.findOne({username})
if(!user){
    console.log("user not exsist")
    return res.status(404).json({
        message: "User not found",
      });
}

if(status === "income" && user.overallBudget !== undefined)
{
   user.overallBudget += amount;
   user.amountLeft += amount;
   await user.save();
}
if( status == "expense" && user.overallBudget !== undefined){
    if(user.overallBudget == 0 && user.amountLeft == 0 ) 
    {
        console.log("insufficient balance")
    }
    user.amountLeft -= amount
    if(user.amountLeft < 0)
    {
        console.log("insufficient balance")
        res.json({
            message:"insufficient balance"
        })
        return 
    }
    await user.save()

}
const newExpense = new ExpenseModel({
    purpose,
    amount,
    status,
    date: new Date(),
    user: user._id,
  });

  // Save the expense to the database
  const savedExpense = await newExpense.save();
  user.expenses.push(savedExpense._id)
  await user.save();
  res.json({
    user,
    expense: savedExpense,
  });


     } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
  
  };
  
export default madeExpense;