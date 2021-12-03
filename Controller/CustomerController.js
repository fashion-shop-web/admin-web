const CustomerService = require('../services/CustomerService');

class CustomerController {

    async homePage(req, res) {
        let currentPage = parseInt(req.query.page) || 1;
        const [customer, pages] = await CustomerService.showListCustomer(currentPage);
        res.render('customer/listCustomer', {customer, pages, currentPage});
    }

}

module.exports = new CustomerController;