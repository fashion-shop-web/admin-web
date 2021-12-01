const express = require('express');
const router = express.Router();

const productController = require('../Controller/ProductController');

//create
router.post('/store', productController.store);
router.get('/add', productController.addForm);

//delete
router.delete('/:id', productController.deleteProduct)

//edit
router.get('/:id/edit', productController.editForm);
router.put('/:id', productController.updateProduct);

//read
router.get('/', productController.homePage);

module.exports = router;