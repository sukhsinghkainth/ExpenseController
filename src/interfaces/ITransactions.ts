import mongoose from "mongoose"

export default interface transaction {
    amount : number
    type : "expesne" | "income";
    account : mongoose.Types.ObjectId
    category : mongoose.Types.ObjectId
    notes : string
    date: Date
}