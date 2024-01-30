// userModel.ts 
import mongoose, { Document, Model, Schema } from 'mongoose';
import IUser from "../interfaces/IUser"
const userSchema = new Schema<IUser>({
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
    totalIncome: {
        type: Number,
        default: 0
    },
    totalExpense: {
        type: Number,
        default: 0
    },
    account: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Account',
        },
    ],
    budget: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Budget',
        },
    ],
});

const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default UserModel;

