import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensure email is unique
    password: { type: String, required: true },
    avatar: {
      type: String, // Optional field for avatar
      default: "",  // Default value if no avatar is provided
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId, // Reference to Post model
        ref: "Post", // Establish relationship with Post schema
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.model("User", userSchema);



