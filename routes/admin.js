const express = require('express');
const router = express.Router();

const AdminController = require('../Controller/AdminController');

router.get('/', AdminController.homePage);

module.exports = router;