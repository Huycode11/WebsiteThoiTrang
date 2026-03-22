const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, seedProducts } = require('../controller/productController');

router.get('/', getProducts);
router.get('/seed', seedProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);

module.exports = router;
