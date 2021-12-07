const express = require('express');
const router = express.Router();
const passport = require('../utils/passport');

const loginController = require('../Controller/LoginController');

//forget password
router.get('/forget', loginController.forgetPage);
router.post('/forget', loginController.sendNewPassword);


//login
router.get('/', loginController.loginPage);
router.post('/', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/?wrong-password'
}));

module.exports = router;