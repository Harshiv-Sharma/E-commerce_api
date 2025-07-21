import mongoose from "mongoose";

const productSchema = new mongoose.Schema( {
    name: { 
        type: String,
        required: [true, "Product name is required" ],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Product description is required"]
    },
    price: { 
        type: Number, 
        required: [true, "Product price is required" ]
    },
    category: {
        type: String,
        required: [true, "Product category is required" ]
    },
    brand: {
        type: String,
        default: "Generic"
    }, 
    countInStock: {
        type: Number,
        required: [true, "Stock count is required"],
        default: 0
    }, 
    image: {
        type: String,
        default: "",
    },
    rating: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // who created this product (admin)
    }
   },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;