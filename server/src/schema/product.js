const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true
    },
    brand: {
        type: String,
        default: 'Fana'
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        default: 0.0
    },
    originalPrice: {
        type: Number
    },
    description: {
        type: String,
        required: [true, 'Please enter product description']
    },
    features: {
        type: [String]
    },
    rating: {
        type: Number,
        default: 0
    },
    reviewsCount: {
        type: Number,
        default: 0
    },
    sku: {
        type: String,
        unique: true
    },
    categories: {
        type: [String]
    },
    tags: {
        type: [String]
    },
    availability: {
        type: Number,
        required: [true, 'Please enter product availability'],
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: [String],
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
