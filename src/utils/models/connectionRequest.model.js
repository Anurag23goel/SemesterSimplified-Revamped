import mongoose from "mongoose";

const connectionRequest = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Links to users collection
    reciver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    seen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const CONNECTION_REQUEST =
  mongoose.models.ConnectionRequest ||
  mongoose.model("ConnectionRequest", connectionRequest);

export default CONNECTION_REQUEST;
