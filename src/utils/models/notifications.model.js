import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Links to users collection
  reciver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const NOTIFICATION =
  mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);
export default NOTIFICATION;
