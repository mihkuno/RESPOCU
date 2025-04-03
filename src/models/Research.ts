import mongoose from "mongoose";

const schema = new mongoose.Schema({
    pdf: {
        type: Buffer,
        contentType: "application/pdf",
        required: true,
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
    keywords: { 
        type: [String], 
        required: true 
    },
    authors: { 
        type: [String], 
        required: true 
    },
    publisher: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Research",
        required: true,
    },
    is_archived: {
        type: Boolean,
        default: false,
    },
    is_published: {
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
