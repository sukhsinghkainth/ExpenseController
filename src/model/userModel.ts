// userModel.ts
import mongoose, { Document, Schema } from 'mongoose';
import IUser from "../interfaces/IUser"
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
    amount: {
        type: Number,
        default : 0
    },
    amountLeft: {
        type: Number,
        default : 0
      
    },
    transactions: [
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

const UserModel = mongoose.model<Document &  IUser>('User', userSchema);

export default UserModel;
