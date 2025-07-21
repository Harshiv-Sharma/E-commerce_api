import express from "express";
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";
import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

// GET /api/products - Public route  [ GET all products ]
router.get("/", getAllProducts);

// GET /api/products/:id - public route  [ GET single product by ID ]
router.get("/:id", getProductById);

// PUT /api/products/:id - Update a product (admin only)
router.put("/:id", protect, admin, updateProduct);

// DELETE /api/products/:id - Delete a product (admin only)
router.delete("/:id", protect, admin, deleteProduct);

// POST /api/products - Create new product (admin only)  
router.post("/", protect, admin, createProduct);




export default router;