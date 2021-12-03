

class LoginController {

    loginPage(req, res) {
        res.render('login', { layout: false })
    }

    RegisterPage(req, res) {
        res.render('register', { layout: false })
    }

}

module.exports = new LoginController;