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
    age: {
      type: Number,
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
      default: "",
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
    course: {
      type: String,
    },
    branch: {
      type: String,
    },
    socketID: {
      type: String,
    },
    accessToken: {
      type: String,
      expires: 60 * 60 * 24, // 1 day
    },
    freeCredits: {
      type: Number,
      default: 1000,
    },
    forgotPasswordOTP: {
      type: String,
      select: false,
      expires: 300, // 5 minutes
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", ""],
      default: "",
    },
    educationLevel: {
      type: String,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    connections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    sentConnectionRequestsUserIDs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    receivedConnectionRequestsUserIDs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    savedDocuments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document",
      },
    ],
  },
  { timestamps: true }
);

const USER = mongoose.models.User || mongoose.model("User", userSchema);

export default USER;
