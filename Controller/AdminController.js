const adminService = require('../services/AdminService');

class AdminController {

    async homePage(req, res) {
        let currentPage = parseInt(req.query.page) || 1;
        const [admin, pages] = await adminService.getListAdmin(currentPage);
        res.render('admin/listAdmin', { admin, pages, currentPage });
    }

    createPage(req, res) {
        res.render('admin/create');
    }

    async storeNewAccount(req, res) {
        const valid = await adminService.createNewAccount(req.body);
        if (valid === 1) {
            res.render('admin/create', { message: 'Password must contain at least 8 characters' })
        } else if (valid === 2) {
            res.render('admin/create', { message: 'Email has been used' })
        } else {
            res.render('admin/create', { success: 'Create success!' });
        }
    }

    updatePage(req, res) {
        res.render('admin/update');
    }

    async storeUpdateInfo(req, res) {
        const valid = await adminService.updateInfo(req.params.id, req.body);
        if (valid) {
            res.render('admin/update', { newinfo: req.body, message: 'Update success' });
        } else {
            res.render('admin/update', { message: "duplicate email" })
        }
    }

    passwordPage(req, res) {
        res.render('admin/password');
    }

    async storeUpdatePassword(req, res) {
        const valid = await adminService.validateChangePass(req.params.id, req.body);
        if (valid === 1) {
            res.render('admin/password', { message: "Wrong current password" });
        } else if (valid === 2) {
            res.render('admin/password', { message: "Cannot change the same password" });
        } else if (valid === 3) {
            res.render('admin/password', { message: "Password must contain at last 8 characters" });
        } else if (valid === 4) {
            res.render('admin/password', { message: "Retype does not match new password" });
        } else {
            res.render('admin/password', { success: "Password has been changed" });
        }
    }

    logOut(req, res) {
        req.logOut();
        res.redirect('/');
    }
}

module.exports = new AdminController;