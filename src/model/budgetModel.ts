import mongoose, { Document, Model, Schema } from 'mongoose';
import budget from '../interfaces/IBudget';

const BudgetSchema = new Schema<budget>({

    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",

    },
    limit: {
        type: Number,
        required: true
    },

    spent: {
        type: Number,

    },
    remaininglimit: {
        type: Number,

    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",

    },
});

const budgetModel: Model<budget> = mongoose.model<budget>('Budget', BudgetSchema);

export default budgetModel;
