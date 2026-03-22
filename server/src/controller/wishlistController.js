const Wishlist = require('../schema/wishlist');

// @desc    Get wishlist by wishlistId
// @route   GET /api/wishlist/:wishlistId
exports.getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ wishlistId: req.params.wishlistId }).populate('items');
        if (!wishlist) {
            return res.status(200).json({ success: true, wishlist: { wishlistId: req.params.wishlistId, items: [] } });
        }
        res.status(200).json({ success: true, wishlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update or create wishlist
// @route   POST /api/wishlist/:wishlistId
exports.updateWishlist = async (req, res) => {
    try {
        const { items } = req.body; // Expecting array of product IDs
        
        let wishlist = await Wishlist.findOneAndUpdate(
            { wishlistId: req.params.wishlistId },
            { items },
            { new: true, upsert: true }
        ).populate('items');

        res.status(200).json({ success: true, wishlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
