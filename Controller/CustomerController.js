const CustomerService = require('../services/CustomerService');

class CustomerController {

    async homePage(req, res) {
        let currentPage = parseInt(req.query.page) || 1;
        const [customer, pages] = await CustomerService.showListCustomer(currentPage);
        res.render('customer/listCustomer', { customer, pages, currentPage });
    }

    async banCustomer(req, res) {
        await CustomerService.banCustomer(req.params.id);
        res.redirect(`/customer?page=${req.query.page}`);
    }

    async unbanCustomer(req, res) {
        await CustomerService.unbanCustomer(req.params.id);
        res.redirect(`/customer?page=${req.query.page}`);
    }

}

module.exports = new CustomerController;