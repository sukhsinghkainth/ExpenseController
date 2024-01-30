import mongoose from "mongoose";
import config from "../config/config";
const DB_URL: string = config.DB_URL || ""
export async function db():Promise<void>{
   try {
    await mongoose
      .connect(DB_URL);
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error(`Error connecting to the database: ${error}`);
  }
}