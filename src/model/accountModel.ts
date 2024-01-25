import mongoose, { Document, Schema } from 'mongoose';
import Account from '../interfaces/IAccount';

const accountSchema = new Schema({

    name: {
        type: String,
        required: true

    },
    accountType: {
        type: String,
        enum: ["card", "cash", "savings", "custom"],
        required: true
    },
    initialAmount: {
        type: Number,
        default: 0
    }


});

const accountModel = mongoose.model<Document & Account>('Account', accountSchema);

export default accountModel;
