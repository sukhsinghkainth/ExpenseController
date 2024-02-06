import mongoose from "mongoose";

export enum categoryType {
    expense = 'expense',
    income = 'income',
}
export default interface category {
    _id ?: string;
    name : string ;
    type : categoryType;
    budget?: mongoose.Types.ObjectId; 
}