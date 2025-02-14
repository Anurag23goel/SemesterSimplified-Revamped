import mongoose from "mongoose";

const databaseConnection = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in your .env.development file");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to DB successfully");
  } catch (error: any) {
    console.log("Error while connecting to DB:", error.message);
  }
};

export default databaseConnection;
