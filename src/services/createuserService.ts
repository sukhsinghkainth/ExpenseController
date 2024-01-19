import { Request, Response } from 'express';
import userModel from '../model/userModel';
// import ExpenseModel from '../model/expenseModel';
// import settlementModel from '../model/settlementModel';

const createuser = async (req: Request, res: Response) => {

    try {

        const {username , email} = req.body;

        if(!username || !email){
            console.log("all fields are required")
            res.json({
                message : "pls enter username and email"
            })
            return 
        }
        // Create a new user
        const newUser = new userModel({
          username: username,
          email: email,
        });
        // Save the user
        const savedUser = await newUser.save();
        res.json(savedUser)


    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
  
  };
  
export default createuser;