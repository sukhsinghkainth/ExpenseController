import mongoose from "mongoose";

export default interface budget{
    category : mongoose.Types.ObjectId
    limit : number;
}