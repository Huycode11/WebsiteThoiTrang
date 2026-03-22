const Brand = require('../schema/brand');

// @desc    Get all brands
// @route   GET /api/brands
exports.getBrands = async (req, res) => {
    try {
        const brands = await Brand.find().sort({ name: 1 });
        res.status(200).json({
            success: true,
            brands
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Create a brand
// @route   POST /api/brands
exports.createBrand = async (req, res) => {
    try {
        const brand = await Brand.create({ name: req.body.name });
        res.status(201).json({
            success: true,
            brand
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Brand already exists.' });
        }
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
