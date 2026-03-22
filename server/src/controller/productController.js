const Product = require('../schema/product');
const mongoose = require('mongoose');

// @desc    Get all products
// @route   GET /api/products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
exports.getProductById = async (req, res) => {
    try {
        let product;
        try {
            product = await Product.findById(req.params.id);
        } catch (err) {
            // If it fails, it's not a valid ObjectId, we will search by sku below
        }
        
        if (!product) {
            product = await Product.findOne({ sku: req.params.id });
        }
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Create a product
// @route   POST /api/products
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Seed products (for testing)
// @route   GET /api/products/seed
exports.seedProducts = async (req, res) => {
    try {
        await Product.deleteMany();
        const sampleProduct = {
            name: "Favorite Daughter The St. Germain Top",
            brand: "Schlumberger®",
            price: 360.00,
            originalPrice: 400.00,
            description: "Balancing laidback LA sensibilities with a rock & roll New York edge, Joe's Jeans crafts flawless, premium quality pairs. Since 2001, a distinctive, fit-first approach to classic silhouettes has made the brand a forerunner in premium denim",
            features: [
                "79% organic cotton, 13% lyocell, 6% polyester, 2% elastane",
                "Five-pocket styling"
            ],
            rating: 5,
            reviewsCount: 1,
            sku: "MEGA-JEWE-03",
            categories: ["Dresses", "Shirt"],
            tags: ["Accessories", "Anklets", "Wedding"],
            availability: 6,
            sold: 28,
            images: [
                "/Fana – Fashion Shop WordPress Theme_files/product-01.jpg",
                "/Fana – Fashion Shop WordPress Theme_files/product-02.jpg",
                "/Fana – Fashion Shop WordPress Theme_files/product-03.jpg",
                "/Fana – Fashion Shop WordPress Theme_files/product-04.jpg"
            ],
            isFeatured: true
        };
        const product = await Product.create(sampleProduct);
        res.status(201).json({
            success: true,
            message: "Products seeded",
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
