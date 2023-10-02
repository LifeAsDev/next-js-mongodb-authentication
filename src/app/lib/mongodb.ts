import mongoose from "mongoose";

const url = process.env.MONGODB_URI || "";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
