import mongoose from "mongoose";

const databaseConnection = async () => {
  if (!process.env.MONGO_DB_URL) {
    throw new Error("Please define MONGODB_URI in your .env.development file");
  }

  try {
    await mongoose.connect(process.env.MONGO_DB_URL as string);
    console.log("Connected to DB successfully");
  } catch (error: any) {
    console.log("Error while connecting to DB:", error.message);
  }
};

export default databaseConnection;
