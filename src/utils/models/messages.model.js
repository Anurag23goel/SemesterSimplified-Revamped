import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Links to users collection
  reciver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const MESSAGE =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);
export default MESSAGE;
