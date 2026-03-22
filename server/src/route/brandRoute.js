const express = require('express');
const { getBrands, createBrand } = require('../controller/brandController');

const router = express.Router();

router.route('/')
    .get(getBrands)
    .post(createBrand);

module.exports = router;
