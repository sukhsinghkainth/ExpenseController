import mongoose from "mongoose";

export default class userResponse {
    _id?: mongoose.Types.ObjectId;
    username: string;
    email: string;
    totalIncome?: number;
    totalExpense?: number;
    account?: mongoose.Types.ObjectId[];
    budget?: mongoose.Types.ObjectId[];

    constructor(
        username: string,
        email: string,
        _id?: mongoose.Types.ObjectId,
        totalIncome?: number,
        totalExpense?: number,
        account?: mongoose.Types.ObjectId[],
        budget?: mongoose.Types.ObjectId[],

    ) {

        this._id = _id;
        this.username = username;
        this.email = email;
        this.totalIncome = totalIncome;
        this.totalExpense = totalExpense;
        this.account = account;
        this.budget = budget;

    }
}