import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    documentURL: {
      type: String,
      required: true,
    },
    uploadedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    category:{
        type: String,
        required: true,
    },
    ratings:{
        type: Number,
        required: true,
    },
    documentID: {
      type: String,
      required: true,
      unique: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true }
);

const DOCUMENT =
  mongoose.models.Document || mongoose.model("Document", documentSchema);

export default DOCUMENT;
