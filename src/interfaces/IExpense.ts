import mongoose from "mongoose";

enum expenseType{
  income = "income",
  expense = "expense"
}

export default interface Expense {
    purpose: string;
    amount: number;
    date: Date;
    user: mongoose.Types.ObjectId; // Reference to the user
    Type: expenseType
  }