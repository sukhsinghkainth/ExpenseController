import User from '../interfaces/IUser';
import userModel from '../model/userModel';
import bcrypt from "bcrypt"
import { userResponse } from '../response/userResponse';
class createUserService {
    static transformUserResponse(user: User): userResponse {
        return new userResponse(user.username, user.email);
    }

    static validataUser(username:string , email:string , password:string)
    {
        const usernameRegex: RegExp = /^[a-zA-Z_]+$/;
        const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!username || !email || !password) {
        throw new Error('Username and email are required' )
        }
        if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== "string") {
      
        throw new Error(`Incorrect data type for username or email`)
        }
        if (!usernameRegex.test(username)) {
            throw new Error( `Invalid username "${username}"` );
        }
        if (!emailRegex.test(email)) {
            throw  new Error(`Invalid email "${email}"`);
        }
        
    }
    async createUser(username : string, email : string, password : string ): Promise<User> {
     
        const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            throw new Error('user already exist');
        }
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (error) {
            console.error(error)
            throw new Error('Failed to hash password')
        }
        const newUser = new userModel({ username, email, password: hashedPassword });
        await newUser.save();
        return newUser;
    }
}
export default createUserService;
