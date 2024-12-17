import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the logged-in user's _id
      ref: "User", // Refers to the 'User' model
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img: {
      type: [String], // Array of image URLs
      required: true,
      validate: [arrayLimit, 'You can upload a maximum of 10 images'], // Optional validation
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    bedroom: {
      type: Number,
      required: true,
      min: 1,
    },
    bathroom: {
      type: Number,
      required: true,
      min: 1,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["buy", "rent"], // Only allow "buy" or "rent"
      required: true,
    },
    property: {
      type: String,
      enum: ["land", "condo", "apartment", "house"], // Only allow specific property types
      required: true,
    },

    // Additional post details
    postDetails: {
      desc: {
        type: String,
        required: true,
        trim: true,
      },
      utilities: {
        type: String,
        required: false,
      },
      pet: {
        type: String,
        required: false,
      },
      income: {
        type: String,
        required: false,
      },
      size: {
        type: String,
        required: false,
      },
      school: {
        type: String,
        required: false,
      },
      bus: {
        type: String,
        required: false,
      },
      restaurant: {
        type: String,
        required: false,
      },
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Function to limit the number of images uploaded
function arrayLimit(val) {
  return val.length <= 10; // Limit the number of images to 10
}

const Post = mongoose.model("Post", postSchema);

export default Post;


