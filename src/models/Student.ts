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


const Student = mongoose.models.Student || mongoose.model("Student", schema);
export default Student;
