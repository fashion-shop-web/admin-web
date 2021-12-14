const express = require('express');
const router = express.Router();

const customerController = require('../Controller/CustomerController');


router.post('/ban/:id', customerController.banCustomer);
router.post('/unban/:id', customerController.unbanCustomer);

router.get('/order/:orderID', customerController.showDetailOrder);
router.post('/order/:orderID', customerController.updateStatus);
router.get('/order', customerController.showOrder);

router.get('/', customerController.homePage);

module.exports = router;