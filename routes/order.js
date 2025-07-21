import express from "express";
import { placeOrder, getMyOrders, getAllOrders, markOrderAsDelivered, getOrderById } from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/", protect, admin, getAllOrders);
router.put("/:id/deliver", protect, admin, markOrderAsDelivered);
router.get("/:id", protect, getOrderById);

export default router;