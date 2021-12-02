class CustomerController {

    homePage(req, res) {
        res.render('customer/listCustomer')
    }

}

module.exports = new CustomerController;