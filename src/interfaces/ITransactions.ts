import mongoose from "mongoose"
import User from "./IUser";
import { categoryType } from "./ICategory";
export default interface transaction {
    amount : number
    type : categoryType
    account : mongoose.Types.ObjectId
    category : mongoose.Types.ObjectId
    notes : string
    date: Date
    user : User
}