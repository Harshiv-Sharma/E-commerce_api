import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const placeOrder = async (req, res) => {
    const user = await User.findById(req.user._id).populate("cart.product");

    if(!user || user.cart.length === 0) {
        return res.status(400).json({ message: "Cart is Empty" });
    }

    const orderItems = user.cart.map(item => ({
        product: item.product._id,
        quantity: item.quantity
    }));

    const totalPrice = user.cart.reduce((acc, item) => 
        acc = item.product.price * item.quantity, 0 );

    const newOrder = new Order({
        user: user._id,
        orderItems,
        shippingAddress: user.address[0],   // User address is an array
        paymentMethod: req.body.paymentMethod || "Cash on Delivery",
        totalPrice
    });

    const savedOrder = await newOrder.save();

    // Clear user's cart after Placing an Order
    user.cart = [];
    await user.save();

    res.status(201).json(savedOrder);
};

export const getMyOrders = async (req, res) => {
    try{
        const orders = await Order.find({ user: req.user._id });
        res.status(200).json(orders);
    } catch(error){
        res.status(500).json({ message: "Error fetching user orders" });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name email");
        res.status(200).json(orders);
    } catch(error) {
        res.status(500).json({ message: "Error Fetching orders" });
    }
};

export const markOrderAsDelivered = async (req, res) => {
    try{
        const order = await Order.findById(req.params.id);

        if(!order) {
            return res.status(404).json({ message: "Order Not found"});
        }

        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder); 
    } 
    catch(error) {
        res.status(500).json({ message: "Failed to update Order" });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");
        if(!order){
            return res.status(404).json({ message: "Order Not Found!"});
        }
        // Allow only the user who owns the order or an admin
        if (req.user._id.equals(order.user._id) || req.user.role === "admin") {
            return res.status(200).json(order);
        } else{
            return res.status(403).json({ message: "Not authorized to view this order" });
        }
    } catch(error){
        res.status(500).json({ message: "Error fetching order" });
    }
};