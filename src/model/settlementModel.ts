import mongoose, { Document, Schema } from 'mongoose';
import settlement from '../interfaces/Settlement';

const settlementSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    data: {
        type: Number,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    status: {
        type: String,
        default: "pending"
    }
});

const settlementModel = mongoose.model<Document & settlement>('Settlement', settlementSchema);

export default settlementModel;
