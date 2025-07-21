import stripe from "../config/stripe.js";
import Product from "../models/Product.js";
import dotenv from "dotenv";

dotenv.config();

// @desc    Create Stripe Checkout Session
// @route   POST /api/payment/create-checkout-session
// @access  Private
export const createCheckoutSession = async (req, res) => {
    try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Create Stripe line items from product IDs
    const line_items = await Promise.all(
      cartItems.map(async (item) => {
        const product = await Product.findById(item.productId);

        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        return {
            price_data: {
                currency: "inr",
                product_data: {
                name: product.name,
            },
            unit_amount: product.price * 100, // Convert ₹ to paise
            },
          quantity: item.quantity,
        };
      })
    );

    // Create the Stripe checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items,
        success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
    });

    res.status(200).json({ url: session.url });
    }
    catch(error){
        console.error("Stripe session error:", error);
        res.status(500).json({ message: error.message || "Something went wrong with payment" });
    }
};
