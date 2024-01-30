// user.routes.ts
import express, { Request, Response } from 'express';
import createUserService from "../../services/createuserService"
import userResponse from '../../response/userResponse';

const router = express.Router();
const userService = new createUserService();

router.post("/createuser", async (req: Request, res: Response) => {
    const { username, email } = req.body;
    if (!username || !email) {
        return res.status(400).json({ error: 'Username and email are required' })
    }
    if (typeof username !== 'string' || typeof email !== 'string') {
        return res.status(400).json({ error: 'Invalid username or email' })
    }
    try {
        const newUser = await userService.createUser({ username, email });
        const userResp = new userResponse(newUser.username, newUser.email,);
        res.status(201).json({
            user: userResp,
        });
    } catch (error: any) {
        console.log(error.message)
        res.status(400).json({ error });
    }

})
export default router;
