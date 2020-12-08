var express = require('express');
var router = express.Router();
var productsController = require('../controllers/products');

router.get('/api/items', productsController.getProducts);
router.get('/api/items/:id', productsController.productDetail);

module.exports = router;