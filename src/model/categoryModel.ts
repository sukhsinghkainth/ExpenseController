import mongoose, { Document, Schema } from 'mongoose';
import ICategory from "../interfaces/ICategory"
const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["expenese", "income"],
        required: true
    },
    budget: {
        type: Schema.Types.ObjectId,
        ref: "Budget",
    }

});

const categoryModel = mongoose.model<Document & ICategory>('Category', categorySchema);

export default categoryModel;
