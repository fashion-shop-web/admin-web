const adminService = require('../services/AdminService');

class AdminController {

    homePage(req, res) {
        res.render('admin/listAdmin');
    }

    createPage(req, res) {
        res.render('admin/create');
    }

    async storeNewAccount(req, res) {
        await adminService.createNewAccount(req.body);
        res.redirect('/admin');
    }
}

module.exports = new AdminController;