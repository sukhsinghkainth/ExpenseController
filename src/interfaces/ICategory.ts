import mongoose from "mongoose";

export default interface category {
    name : string ;
    type : "income" | "expense" | "custom";
    budget?: mongoose.Types.ObjectId; 
}