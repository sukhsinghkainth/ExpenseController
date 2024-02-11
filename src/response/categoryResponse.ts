import mongoose from "mongoose";
import { categoryType } from "../interfaces/ICategory";

export class categoryResponse {
    name: string;
    type: categoryType;
    _id?: mongoose.Types.ObjectId;
    constructor(
        name: string,
        type: categoryType,
        _id?: mongoose.Types.ObjectId,
    ) {
        this._id = _id,
            this.name = name,
            this.type = type
    }
}