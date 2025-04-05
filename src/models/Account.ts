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
  type: { 
    type: String, 
    enum: ["user", "admin"], 
    default: "user"
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
});


const Account = mongoose.models.Account || mongoose.model("Account", schema);
export default Account;
