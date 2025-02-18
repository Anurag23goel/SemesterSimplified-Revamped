import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({}, { timestamps: true });

const COURSE = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default COURSE;
