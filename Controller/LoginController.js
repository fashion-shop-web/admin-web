

class LoginController {

    loginPage(req, res) {
        const wrongPassword = req.query['wrong-password'] !== undefined;
        res.render('login', { layout: false, wrongPassword })
    }

    logOut(req, res) {
        req.logOut();
        res.redirect('/');
    }

}

module.exports = new LoginController;