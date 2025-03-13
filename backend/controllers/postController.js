import Post from "../models/Post.js";
import multer from "multer";
import path from "path";

// Configure multer storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save uploaded files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get file extension
    if (ext !== ".jpeg" && ext !== ".jpg" && ext !== ".png") {
      return cb(new Error("Only jpeg, jpg, and png images are allowed"));
    }
    cb(null, Date.now() + ext); // Create a unique filename with timestamp
  },
});

// Initialize multer upload middleware
const upload = multer({ storage: storage }).array("images", 5); // Up to 5 images

// Add a new post
export const addPost = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log("xoxox");
      return res.status(400).json({ error: err.message });
    }

    try {
      const {
        id, // User ID
        title,
        price,
        address,
        city,
        bedroom,
        bathroom,
        latitude,
        longitude,
        type,
        property,
        // Post details
        desc,
        utilities,
        pet,
        income,
        size,
        school,
        bus,
        restaurant,
      } = req.body;

      // Get the URLs of the uploaded images
      // Assuming you expect an array of files
const images = req.files; // multer stores files in req.files
if (!images) {
  return res.status(400).json({ error: "No images uploaded" });
}
const imageUrls = images.map((file) => file.path); // Use map only if images is defined


      // Validate required fields
      if (!title || !price || !address || !city || !desc) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Create a new post with image URLs
      const newPost = new Post({
        id, // Refers to the _id of the user who created the post
        title,
        price,
        img: imageUrls, // Array of image URLs
        address,
        city,
        bedroom,
        bathroom,
        latitude,
        longitude,
        type,
        property,
        postDetails: {
          desc,
          utilities,
          pet,
          income,
          size,
          school,
          bus,
          restaurant,
        },
      });

      const savedPost = await newPost.save();
      res.status(201).json({ message: "Post created successfully", post: savedPost });
    } catch (error) {
      console.error("Error while adding post:", error);
      res.status(500).json({ error: "Failed to create post" });
    }
  });
};

  

// Update a post by ID
export const updatePostById = async (req, res) => {
  try {
    const { id } = req.params; // Post ID

    // Validate updated 'img' field if provided
    if (req.body.img) {
      if (!Array.isArray(req.body.img) || req.body.img.some((url) => typeof url !== "string")) {
        return res
          .status(400)
          .json({ error: "Invalid images format. Provide an array of image URLs." });
      }
    }

    const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.error("Error while updating post:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
};

// Delete a post by ID
export const deletePostById = async (req, res) => {
  try {
    const { id } = req.params; // Post ID
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully", post: deletedPost });
  } catch (error) {
    console.error("Error while deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error while fetching all posts:", error);
    res.status(500).json({ error: "Failed to retrieve posts" });
  }
};

// Get a post by ID
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params; // Post ID
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error while fetching post by ID:", error);
    res.status(500).json({ error: "Failed to retrieve post" });
  }
};



