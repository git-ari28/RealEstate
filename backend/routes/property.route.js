import express from "express";
import upload from "../middleware/upload.js"; // Import multer config
import {
  addProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
} from "../controllers/property.controller.js";

const router = express.Router();


router.post("/add", upload, addProperty);


router.get("/", getAllProperties);

router.get("/:propertyId", getPropertyById);


router.put("/:propertyId", updateProperty);


router.delete("/:propertyId", deleteProperty);

export default router;

