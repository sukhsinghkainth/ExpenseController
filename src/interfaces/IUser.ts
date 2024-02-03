import mongoose from "mongoose";

export default interface User {
    _id?: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password : string;
    totalIncome?: number
    totalExpense? : number
    account ?: mongoose.Types.ObjectId[];
    budget ?: mongoose.Types.ObjectId[];
  }
