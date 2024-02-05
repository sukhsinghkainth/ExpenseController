// user.routes.ts
import express, { Request, Response } from 'express';
import createUserService from "../../services/createuserService"
import User from '../../interfaces/IUser';
import { authService } from '../../services/authService';
import auth from './middlewares/isAuth';
import UserModel from '../../model/userModel';


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

router.get("/test", auth, async (req, res) => {
    try {
        const id = req.user.id;
        const email = req.user.email
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
export default router;
