// user.routes.ts
import express, { Request, Response } from 'express';
import createUserService from "../../services/createuserService"
import userResponse from '../../response/userResponse';

const router = express.Router();
const userService = new createUserService();

const usernameRegex = /^[a-zA-Z_]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


router.post("/createuser", async (req: Request, res: Response) => {
    const { username, email } = req.body;
    if (!usernameRegex.test(username)) {
        return res.status(400).json({ error: 'Invalid username format' });
      }
    if (!username || !email) {
        return res.status(400).json({ error: 'Username and email are required' })
    }
    if (typeof username !== 'string' || typeof email !== 'string') {
        return res.status(400).json({ error: 'Invalid username or email' })
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
      }
    try {
        const newUser = await userService.createUser({ username, email });
        const userResp = new userResponse(newUser.username, newUser.email,);
        res.status(201).json({
            user: userResp,
        });
    } catch (error: any) {
        console.error(error.message)
        res.status(500).json({ error });
    }

})
export default router;
