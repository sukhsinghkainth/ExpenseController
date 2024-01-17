import mongoose from "mongoose";
export default interface settlement {
    amount: number;
    data: number;
    user: mongoose.Types.ObjectId; // Reference to the user
    status: string
}