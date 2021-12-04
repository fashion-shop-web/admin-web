
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
}

module.exports = new LoginController;