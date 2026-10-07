import mongoose from "mongoose";
import { DB_URI } from "../config/config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database Connected Successfully 🚀");
  } catch (error) {
    console.error("Database Connection Failed ❌", error);
  }
};