import mongoose, { Document, Schema } from 'mongoose';
import budget from '../interfaces/IBudget';

const BudgetSchema = new Schema({

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
    budget: {
        type: Schema.Types.ObjectId,
        ref: "Budget",

    },
  
  
});

const budgetModel = mongoose.model<Document & budget>('Budget', BudgetSchema);

export default budgetModel;
