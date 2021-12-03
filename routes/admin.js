const express = require('express');
const router = express.Router();

const AdminController = require('../Controller/AdminController');
const LoginController = require('../Controller/LoginController');

router.get('/login', LoginController.loginPage);
router.get('/register', LoginController.RegisterPage);

router.get('/', AdminController.homePage);

module.exports = router;