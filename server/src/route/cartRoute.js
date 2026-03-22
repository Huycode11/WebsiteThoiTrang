const express = require('express');
const { getCart, updateCart } = require('../controller/cartController');

const router = express.Router();

router.route('/:cartId')
    .get(getCart)
    .post(updateCart);

module.exports = router;
