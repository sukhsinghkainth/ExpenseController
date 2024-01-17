import mongoose, { Document, Schema } from 'mongoose';
import IExpense from "../interfaces/IExpense"

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "enter unique name"],
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
});

const UserModel = mongoose.model<IExpense & Document>('Users', UserSchema);
export default UserModel;
