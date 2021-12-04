const express = require('express');
const router = express.Router();

const AdminController = require('../Controller/AdminController');


router.get('/create', AdminController.createPage);
router.post('/create', AdminController.storeNewAccount);

router.get('/', AdminController.homePage);

module.exports = router;