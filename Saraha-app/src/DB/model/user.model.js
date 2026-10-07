import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName is required"],
      trim: true,
      minLength: [2, "firstName must be at least 2 characters"],
      maxLength: [20, "firstName must be at most 20 characters"],
    },
    lastName: {
      type: String,
      required: [true, "lastName is required"],
      trim: true,
      minLength: [2, "lastName must be at least 2 characters"],
      maxLength: [20, "lastName must be at most 20 characters"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;