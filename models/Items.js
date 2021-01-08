import mongoose from "mongoose";

// creating Schema (or structure) for the data to be saved in mongo db
const ItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("item", ItemSchema); // .model("x",y) will create a new collection namely "x" using y schema in databse
