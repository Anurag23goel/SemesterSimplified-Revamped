import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
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

const COLLEGE =
  mongoose.models.College || mongoose.model("College", collegeSchema);
export default COLLEGE;
