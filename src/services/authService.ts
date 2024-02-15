
import config from "../config/config";
import User from "../interfaces/IUser";
import UserModel from "../model/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export class authService {
    static login = async (email: string, password: string): Promise<{ user: User; token: string }> => {
        try {
            let user = await UserModel.findOne({ email });
            if (!user || !await bcrypt.compare(password, user.password)) {
                throw new Error("user not registered or password incorrect")
            }
            const token = this.generateToken(user);
            return { user, token };
        } catch (error) {
            console.log(`Error in Auth Service ${error}`);
            throw error;

        }
    }
    private static generateToken = (user: any): string => {
        const { JWT_KEY } = config;
        if (!JWT_KEY) {
            throw new Error("JWT secret key not found in config");
        }
        const payload = {
            email: user.email,
            id: user.id,
        };
        let Token = jwt.sign(payload, JWT_KEY!, {
            expiresIn: "2h",
        });
        user = user.toObject();
        user.token = Token;
        return Token;

    }

}