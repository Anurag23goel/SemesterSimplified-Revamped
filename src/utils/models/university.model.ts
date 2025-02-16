import mongoose from "mongoose";

const universitySchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      unique: true,
    },
    logoUrl: {
      type: String,
    },
    abbreviation: {
      type: String,
    },
  },
  { timestamps: true }
);

const UNIVERSITY =
  mongoose.models.University || mongoose.model("University", universitySchema);

export default UNIVERSITY;
