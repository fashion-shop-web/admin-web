class SiteController {

    //[GET] blank
    blankPage(req, res) {
        res.render('blank');
    }
    //[GET] UI
    UIPage(req, res) {
        res.render('ui');
    }
    //[GET] load home page /
    homePage(req, res) {
        res.render('index');
    }
    //[GET] load user page /
    user(req, res) {
        res.render('user');
    }
}

module.exports = new SiteController;