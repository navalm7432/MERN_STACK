import mongoose from "mongoose";

// creating Schema (or structure) for the data to be saved in mongo db
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Users", UserSchema); // .model("x",y) will create a new collection namely "x" using y schema in databse
