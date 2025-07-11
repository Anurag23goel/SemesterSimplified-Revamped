import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MessageRoom",
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  seen: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const MESSAGE =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);

const messageRoomSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    room_type: {
      type: String,
      enum: ["individual", "group"],
      required: true,
    },
    name: {
      type: String,
    },
    lastMessageContent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const MESSAGE_ROOM =
  mongoose.models.MessageRoom ||
  mongoose.model("MessageRoom", messageRoomSchema);
