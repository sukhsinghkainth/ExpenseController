import mongoose from "mongoose";
import User from "./IUser";

export default interface budget{
    category : mongoose.Types.ObjectId
    limit : number;
    spent : number;
    remaininglimit : number;
    user : User
}