const express = require('express');
const router = express.Router();

const productController = require('../Controller/ProductController');

router.post('/store', productController.store);
router.get('/add', productController.addForm);
router.delete('/:id', productController.deleteProduct)
router.get('/', productController.homePage);

module.exports = router;