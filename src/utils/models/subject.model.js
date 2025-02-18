import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({}, { timestamps: true });

const SUBJECT = mongoose.models.Subject || mongoose.model("Subject", subjectSchema);

export default SUBJECT;
