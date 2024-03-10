// user.routes.ts
import express, { Request, Response} from 'express';
import createUserService from "../../services/createuserService"
import User from '../../interfaces/IUser';
import { authService } from '../../services/authService';
import auth from './middlewares/isAuth';
import UserModel from '../../model/userModel';
import ReqWithUser from '../../interfaces/Ireq';


const router = express.Router();
const userService = new createUserService();

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
        res.status(500).json({ error : ` ${(error as Error).message}` });
    }
})

router.post("/signup", async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

     try {
         createUserService.validataUser(username,email,password)
     }  catch (error: any) {
        console.error(error.message)
       return  res.status(500).json({ error : `error while trying to signup : ${(error as Error).message}` });
    }
    try {
        const data = await userService.createUser(
            username, email, password
        )

        const Response = createUserService.transformUserResponse(data);
        return res.status(201).json({
             Response,
             messaage: "user created successfully"
         });
    } catch (error: any) {
        console.error(error.message)
     return  res.status(500).json({ error : `error while trying to signup : ${(error as Error).message}` });
    }

})
export default router;