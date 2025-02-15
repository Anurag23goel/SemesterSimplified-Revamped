import mongoose from "mongoose";

const databaseConnection = async () => {

  console.log(process.env.MONGO_DB_URL);
  

  if (!process.env.MONGO_DB_URL) {
    throw new Error("Please define MONGO_DB_URL in your .env.development file");
  }

  try {
    await mongoose.connect(process.env.MONGO_DB_URL as string);
    console.log("Connected to DB successfully");
  } catch (error: any) {
    console.log("Error while connecting to DB:", error.message);
  }
};

export default databaseConnection;
