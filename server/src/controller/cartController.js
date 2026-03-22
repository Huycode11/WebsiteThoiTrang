const Cart = require('../schema/cart');

// @desc    Get cart by cartId
// @route   GET /api/cart/:cartId
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ cartId: req.params.cartId }).populate('items.product');
        if (!cart) {
            return res.status(200).json({ success: true, cart: { cartId: req.params.cartId, items: [] } });
        }
        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update or create cart
// @route   POST /api/cart/:cartId
exports.updateCart = async (req, res) => {
    try {
        const { items } = req.body;
        
        let cart = await Cart.findOneAndUpdate(
            { cartId: req.params.cartId },
            { items },
            { new: true, upsert: true }
        ).populate('items.product');

        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
