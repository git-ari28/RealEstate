import express from "express";
import { register, login, logout, updateProfile, getUserDetails } from "../controllers/auth.controller.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { upload } from "../controllers/auth.controller.js"; 

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);


router.put("/update", authenticateUser, upload.single("avatar"), updateProfile);
router.get("/user-details", authenticateUser, getUserDetails);

export default router;

