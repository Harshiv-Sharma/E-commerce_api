import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // All cart routes require login

router.post("/", addToCart); // Add to cart
router.get("/", getCart); // View Cart
router.delete("/:productId", removeFromCart); // Remove Item

export default router;