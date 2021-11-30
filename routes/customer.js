const express = require('express');
const router = express.Router();

const customerController = require('../Contronller/CustomerController');

router.get('/', customerController.homePage);

module.exports = router;