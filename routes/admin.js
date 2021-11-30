const express = require('express');
const router = express.Router();

const AdminController = require('../Contronller/AdminController');

router.get('/', AdminController.homePage);

module.exports = router;