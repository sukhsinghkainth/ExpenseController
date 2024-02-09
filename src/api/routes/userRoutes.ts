// user.routes.ts
import express, { Request, Response } from 'express';
import createUserService from "../../services/createuserService"
import User from '../../interfaces/IUser';
import { authService } from '../../services/authService';
import auth from './middlewares/isAuth';
import UserModel from '../../model/userModel';
import ReqWithUser from '../../interfaces/Ireq';
import categoryModel from '../../model/categoryModel';
import IncomeService from '../../services/expensesService';

const router = express.Router();
const userService = new createUserService();

const usernameRegex: RegExp = /^[a-zA-Z_]+$/;
const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;



router.post("/login", async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body as User;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                Message: "please fill the detiail",
            });
        }
        const { user, token } = await authService.login(email, password)
        res.cookie("token", token, {
            expires: new Date(Date.now() + 3 * 3600 * 1000),
            httpOnly: true
        })
        const Response = createUserService.transformUserResponse(user);
        return res.json({ Response, token })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "login fail INVALID CREDENTIAL",
        });
    }

})

router.get("/test", auth, async (req: ReqWithUser, res: Response) => {
    try {
        const id = req.user?.id;
        const email = req.user?.email
        console.log(id, email);
        const u = await UserModel.findById(id);

        res.json({
            message: "hello ji",
            u
        })
    } catch (error) {
        console.error(error)
    }
})

router.post("/signup", async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username and email are required' })
    }
    if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== "string") {
        return res.status(400).json({ error: 'Invalid username or email' })
    }
    if (!usernameRegex.test(username)) {
        return res.status(400).json({ error: 'Invalid username format' });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }
    try {
        const data = await userService.createUser({
            username, email, password,
        });

        const Response = createUserService.transformUserResponse(data);
        res.status(201).json({
            Response,
            messaage: "user created successfully"
        });
    } catch (error: any) {
        console.error(error.message)
        res.status(500).json({ error });
    }

})

router.post('/income' , auth, async (req: ReqWithUser, res: Response) => {
    try {
      const { amount, type, notes, accountType, categoryName } = req.body;
  
      if (!amount || !type || !notes || !accountType || !categoryName) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      if (type !== 'income') {
        return res.status(400).json({ error: 'Type should be income' });
      }
  
      const category = await categoryModel.findOne({ name: categoryName });
  
      if (!category || category.type !== 'income') {
        return res.status(400).json({ error: 'Invalid category' });
      }

      const account = await IncomeService.createAccount(req, accountType);
  
      await IncomeService.createIncome(req, amount, notes, account.id, category._id , accountType);
  
      res.status(200).json({ message: 'Income added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/total-income',auth, async (req : ReqWithUser, res) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      const accounts = await IncomeService.getAccountsByUser(user.id);
      const transactions = await IncomeService.getTransactionsByAccounts(accounts);
      const totalIncome = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  
      res.json({ totalIncome });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


export default router;