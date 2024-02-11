import mongoose from "mongoose";
import { categoryType } from "../interfaces/ICategory";

export class transactionResponse {
    type: categoryType;
    account: {
        _id: mongoose.Types.ObjectId;
        accountType: string;
    };
    category: {
        name: string;
        type: categoryType;
    };
    notes: string;
    date: Date;
    _id: mongoose.Types.ObjectId;
    amount: number;

    constructor(
        type: categoryType,
        _id: mongoose.Types.ObjectId,
        account: { _id: mongoose.Types.ObjectId; accountType: string },
        category: { name: string; type: categoryType },
        notes: string,
        date: Date,
        amount: number
    ) {
        this._id = _id;
        this.type = type;
        this.account = account;
        this.category = category;
        this.notes = notes;
        this.date = date;
        this.amount = amount;
    }
}