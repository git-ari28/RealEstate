import mongoose from "mongoose";

// PostDetails Schema
const postDetailsSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", // Reference to the Post model
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  utilities: {
    type: String,
  },
  pet: {
    type: String,
  },
  income: {
    type: String,
  },
  size: {
    type: String,
  },
  school: {
    type: String,
  },
  bus: {
    type: String,
  },
  restaurant: {
    type: String,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Export the model
export default mongoose.model("PostDetails", postDetailsSchema);
