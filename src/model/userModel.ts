// userModel.ts
import mongoose, { Document, Schema } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please enter a unique name"],
        unique: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
    },
    overallBudget: {
        type: Number,
        required: true,
    },
    amountLeft: {
        type: Number,
        required: true,
    },
    expenses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Expense',
        },
    ],
    settlements: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Settlement',
        },
    ],
});

const UserModel = mongoose.model<Document>('User', userSchema);

export default UserModel;
