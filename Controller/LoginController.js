const loginService = require('../services/LoginService');

class LoginController {

    loginPage(req, res) {
        const wrongPassword = req.query['wrong-password'] !== undefined;
        res.render('login', { layout: false, wrongPassword })
    }

    logOut(req, res) {
        console.log('da log out')

        req.logOut();
        // res.redirect('/');
        console.log('da log out')
        res.json({
            message: "logged out"
        })
    }

    forgetPage(req, res) {
        res.render('forget', { layout: false });
    }

    async sendNewPassword(req, res) {
        const { email } = req.body;
        await loginService.sendNewPassword(email);
        res.redirect('/');
    }
}

module.exports = new LoginController;