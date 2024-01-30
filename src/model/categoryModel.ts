import mongoose, {Model, Schema } from 'mongoose';
import ICategory, { categoryType } from "../interfaces/ICategory"
const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: categoryType,
        required: true
    },
    budget: {
        type: Schema.Types.ObjectId,
        ref: "Budget",
    }
    
});

const categoryModel :Model<ICategory>= mongoose.model<ICategory>('Category', categorySchema);

export default categoryModel;
