const express = require('express');
const router = express.Router();

const productController = require('../Controller/ProductController');

router.get('/', productController.homePage);

module.exports = router;