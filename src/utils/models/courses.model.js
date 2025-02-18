import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
        unique: true
    },
    courseID:{
        type: String,
        required: true,
        unique: true
    },
    documents:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Document"
        }
    ],
    

}, { timestamps: true });

const COURSE = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default COURSE;
