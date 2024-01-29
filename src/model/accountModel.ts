import mongoose, { Document, Schema } from 'mongoose';
import Account from '../interfaces/IAccount';

const accountSchema = new Schema({
acctype :{
    type: String,
    enum : ["savings" , "card", "cash"]
},
    transaction: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Transaction',
        },
    ],
    user: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    created_at: {
        type: Date,
        default: Date.now
      }


});

const accountModel = mongoose.model<Document & Account>('Account', accountSchema);

export default accountModel;
