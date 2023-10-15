import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nameLower: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
export default models.User || mongoose.model("User", userSchema);
