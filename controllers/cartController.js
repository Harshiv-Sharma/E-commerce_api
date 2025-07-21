import User from "../models/User.js";
import Product from "../models/Product.js";

// @desc    Add item to cart
// @route   POST /api/cart
// @access  private
export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    // 🔒 Validate product ID
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const user = await User.findById(req.user._id);
    
    const existingItem = user.cart.find(item => 
        item.product.toString() === productId
    );

    if(existingItem) {
        // Update quantity
        existingItem.quantity += quantity;
    } else {
        // Add new Item to cart
        user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.json(user.cart);
};

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
    const user = await User.findById(req.user._id).populate("cart.product");
    res.json(user.cart);
};

// @desc    Remove Item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
export const removeFromCart = async (req, res) => {
    const productId = req.params.productId;

    const user = await User.findById(req.user._id);

    user.cart = user.cart.filter(
        item => item.product.toString() != productId
    );
    await user.save();
    res.json(user.cart);
}
