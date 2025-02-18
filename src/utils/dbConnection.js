import mongoose from "mongoose";
import "dotenv/config";

const databaseConnection = async () => {
  if (!process.env.MONGO_DB_URL) {
    throw new Error("Please define MONGO_DB_URL in your .env.development file");
  }

  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    // console.log("Connected to DB successfully");
  } catch (error) {
    console.log("Error while connecting to DB:", error.message);
  }
};

export default databaseConnection;
