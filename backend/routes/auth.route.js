import express from "express";
const router=express.Router()
import {register,login,logout,updateProfile,getUserDetails} from "../controllers/auth.controller.js"
import {authenticateUser} from '../middleware/authMiddleware.js';

router.post("/register",register);
router.put("/update",authenticateUser,updateProfile);
router.get('/user-details', authenticateUser, getUserDetails);

router.post("/login",login);

router.post("/logout",logout);



export default router;