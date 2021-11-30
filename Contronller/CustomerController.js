class CustomerController {

    homePage(req, res) {
        res.render('customer')
    }

}

module.exports = new CustomerController;