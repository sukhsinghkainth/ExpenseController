import mongoose, { Document, Schema } from 'mongoose';

const expenseSchema = new Schema({
    description: {
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
});

const ExpenseModel = mongoose.model('Expense', expenseSchema);

export default ExpenseModel;
