import Product from "../models/Product.js";

// @desc    Create a new product (Admin only)
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, brand, countInStock, image, isFeatured } = req.body;
        const product = new Product({ name,
                                    description,
                                    price,
                                    category,
                                    brand,
                                    countInStock,
                                    image,
                                    isFeatured, 
                                    createdBy: req.user._id // comes from protect middleware
                                });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch(error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({ message: "Failed to create product" });
    }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    }
    catch(error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ message: "Failed to fetch products" });
    }
};

// @desc    Get a single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product Not Found" });
        }
    } catch(error) {
        console.error("Error fetching product:", error.message);
        res.status(500).json({ message: "Failed to fetch product" });
    }
};

// @desc    Update a product by ID
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, brand, countInStock, image, isFeatured } = req.body;
        const product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(404).json({ message: "Product NOT Found" });
        }

        // Update Fields
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.brand = brand || product.brand;
        product.countInStock = countInStock || product.countInStock;
        product.image = image || product.image;
        product.isFeatured = isFeatured ?? product.isFeatured;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } 
    catch(error) {
        console.error("Error Updating Product:", error.message);
        res.status(500).json({ message: "Failed to Update product" });
    }
};

// @desc    Delete a product by ID
// @route   DELETE /api/products/:id
// @access  Private / Admin
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({ message: "Product NOT Found" });
        }

        await product.deleteOne();
        res.json({ message: "Product Deleted Successfully" });
    }
    catch(error){
        console.error("Error deleting product:", error.message);
        res.status(500).json({ message: "Failed to Delete the Product" });
    }
};