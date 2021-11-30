const express = require('express');
const router = express.Router();

const productController = require('../Contronller/ProductController');

router.get('/', productController.homePage);

module.exports = router;