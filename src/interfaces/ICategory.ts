import mongoose from "mongoose";

export enum categoryType {
    expense = 'expense',
    income = 'income',
}
export default interface category {
    _id ?: mongoose.Types.ObjectId;
    name : string ;
    type : categoryType;
}