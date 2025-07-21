import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getUserProfile } from "../controllers/userController.js";

const router = express.Router();

// GET   /api/users/profile — protected
router.get("/profile", protect, getUserProfile);

export default router;