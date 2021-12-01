class AdminController {

    homePage(req, res) {
        res.render('index');
    }
}

module.exports = new AdminController;