import mongoose from "mongoose";

const schema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  bookmarks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Research",
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
});


const Faculty = mongoose.models.Faculty || mongoose.model("Faculty", schema);
export default Faculty;
