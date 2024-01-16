import mongoose from "mongoose";
export default interface Expense {
    description: string;
    amount: number;
    date: Date;
    user: mongoose.Types.ObjectId; // Reference to the user
  }