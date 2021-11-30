const express = require('express');
const router = express.Router();

const customerController = require('../Controller/CustomerController');

router.get('/', customerController.homePage);

module.exports = router;