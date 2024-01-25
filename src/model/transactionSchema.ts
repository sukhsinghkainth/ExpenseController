import mongoose, { Document, Schema } from 'mongoose';
import ITransactions from "../interfaces/ITransactions"

const TransactionSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    type : {
        type: String,
        enum : ["expenese" , "income"]

    },
    account :{
            type : Schema.Types.ObjectId,
            ref : "Account",
            required : true,
    },
    category :
    {
        type : Schema.Types.ObjectId,
        ref : "Category",
        required : true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    
    notes: {
        type: String,
        required: true,
    },
 
});

const transactionModel = mongoose.model<Document & ITransactions>('Transaction', TransactionSchema);

export default transactionModel;
