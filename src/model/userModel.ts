import mongoose, { Document, Schema } from 'mongoose';

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "enter unique name"],
        unique: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    overallBudget: {
        type: Number,
        required: true,
    },
    budgetLeft: {
        type: Number,
        required: true,
    },
    expenses: [{
        type: Schema.Types.ObjectId,
        ref: 'Expense',
    }]
});

const UserModel = mongoose.model('Users', UserSchema);

export default UserModel;
