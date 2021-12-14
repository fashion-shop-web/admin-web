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

    async showOrder(req, res) {
        const orders = await CustomerService.getListOrder();
        res.render('customer/order', { orders });
    }

    async showDetailOrder(req, res) {
        const orderID = req.params.orderID;
        const [userInfo, products, userOrder] = await CustomerService.getDetailOrder(orderID);
        const error = req.query['error'] !== undefined;
        const success = req.query['success'] !== undefined;
        res.render('customer/detailOrder', { userInfo, products, userOrder, error, success });
    }

    async updateStatus(req, res) {
        const orderID = req.params.orderID;
        const status = req.body.status;
        const error = await CustomerService.changeStatus(orderID, status);
        if (!error) res.redirect(`/customer/order/${orderID}?success`);
        else res.redirect(`/customer/order/${orderID}?error`);
    }

}

module.exports = new CustomerController;