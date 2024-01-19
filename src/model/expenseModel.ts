import mongoose, { Document, Schema } from 'mongoose';
import IUser from "../interfaces/IUser"

const expenseSchema = new Schema({
    purpose: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    Type :{
        type : String,
        default : "pending"
    }
});

const ExpenseModel = mongoose.model<Document & IUser>('Expense', expenseSchema);

export default ExpenseModel;
