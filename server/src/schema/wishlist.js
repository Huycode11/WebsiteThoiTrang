const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    wishlistId: {
        type: String,
        required: true,
        unique: true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }]
}, { timestamps: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);
