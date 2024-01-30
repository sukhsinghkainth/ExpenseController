import mongoose, { Schema, model, Model } from 'mongoose';
import IAccount ,{ AccountType }from '../interfaces/IAccount';

const accountSchema = new Schema<IAccount>({
    accountType: {
        type: String,
        enum: AccountType,
        required: true,
    },
    transactions: {
        type: [Schema.Types.ObjectId],
        ref: 'Transaction',
    },
    users: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

accountSchema.index({ accountType: 1 });

const Account: Model<IAccount> = model<IAccount>('Account', accountSchema);

export default Account;