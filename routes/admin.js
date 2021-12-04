const express = require('express');
const router = express.Router();

const adminController = require('../Controller/AdminController');


//create new admin
router.get('/create', adminController.createPage);
router.post('/create', adminController.storeNewAccount);

//update current admin information
router.get('/update', adminController.updatePage);
router.post('/update/:id', adminController.storeUpdateInfo);

//change password
router.get('/password', adminController.passwordPage);
router.post('/password/:id', adminController.storeUpdatePassword);

//logout
router.get('/logout', adminController.logOut);

router.get('/', adminController.homePage);

module.exports = router;