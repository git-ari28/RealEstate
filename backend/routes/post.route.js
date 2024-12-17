import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { addPostDetails } from "../controllers/postDetailsController.js";
import multer from "multer"
const upload = multer({ dest: 'uploads/' });




import {
  addPost,
  updatePostById,
  deletePostById,
  getAllPosts,
  getPostById,
} from "../controllers/postController.js"; // Import controller functions

const router = express.Router();

// Route to add a new post
router.post('/add', authenticateUser, upload.array('images', 5), addPost);

// Route to update a post by ID
router.put("/update/:id",authenticateUser,updatePostById);

// Route to delete a post by ID
router.delete("/delete/:id",authenticateUser, deletePostById);

// Route to get all posts
router.get("/all", getAllPosts);

// Route to get a post by ID
router.get("/:id", getPostById);

router.post("/details/add", addPostDetails);

export default router;
