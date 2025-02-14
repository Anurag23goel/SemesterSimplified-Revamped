import exp from "constants";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["Administrator", "User"],
      default: "User",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    profilePicture: {
      type: String,
    },
    documentsUploaded: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document",
      },
    ],
    university: {
      type: String,
    },
    college: {
      type: String,
    },
    socketID: {
      type: String,
    },
    accessToken: {
      type: String,
      expiresIn: "1d",
    },
  },

  { timestamps: true }
);

const USER = mongoose.models.User || mongoose.model("User", userSchema);

export default USER;
