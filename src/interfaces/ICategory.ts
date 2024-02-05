import mongoose from "mongoose";

export enum categoryType {
    expense = 'expense',
    income = 'income',
}
export default interface category {
    name : string ;
    type : categoryType;
    budget?: mongoose.Types.ObjectId; 
}