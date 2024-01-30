import mongoose from "mongoose";

export enum categoryType {
    EXPENSE = 'expense',
    INCOME = 'income',
}
export default interface category {
    name : string ;
    type : categoryType;
    budget?: mongoose.Types.ObjectId; 
}