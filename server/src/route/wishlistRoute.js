const express = require('express');
const { getWishlist, updateWishlist } = require('../controller/wishlistController');

const router = express.Router();

router.route('/:wishlistId')
    .get(getWishlist)
    .post(updateWishlist);

module.exports = router;
