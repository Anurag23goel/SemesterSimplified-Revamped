import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({}, {timestamps: true});

const DOCUMENT = mongoose.models.Document || mongoose.model("Document", documentSchema);

export default DOCUMENT