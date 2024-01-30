import mongoose from "mongoose";

export default interface User {
    username: string;
    email: string;
    totalIncome: number
    totalExpense : number
    account : mongoose.Types.ObjectId[];
    budget ?: mongoose.Types.ObjectId[];
  }
