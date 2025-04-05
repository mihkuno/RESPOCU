import { sign } from "crypto";
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    file: {
        name: { type: String, required: true },
        size: { type: Number, required: true },
        type: { type: String, required: true },
        data: { type: Buffer, required: true },
        last_modified: { type: Number, required: true },
    },
    title: { 
        type: String, 
        required: true, 
        unique: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    categories: { 
        type: [String], 
        required: true 
    },
    research_type: {
        type: String,
        // enum: ["research", "publication"],
        required: true,
    },
    authors: { 
        type: [String], 
        required: true 
    },
    publisher: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Account",
        required: true,
    },
    bookmarked_by: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Account",
    },
    is_best: {
        type: Boolean,
        default: false,
    },
    is_archived: {
        type: Boolean,
        default: false,
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    },
});


const Research = mongoose.models.Research || mongoose.model("Research", schema);
export default Research;
