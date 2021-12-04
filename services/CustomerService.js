const user = require('../models/user');

const showListCustomer = async (reqPage) => {
    try {
        let customers = await user.find({ role: false }).lean();
        customers.reverse();
        const page = reqPage;
        const perPage = 10;

        const start = (page - 1) * perPage;
        const end = page * perPage;
        const pages = [];

        for (let count = 0; count < customers.length / perPage; count++) {
            pages.push(count + 1);
        }

        customers = customers.slice(start, end);

        return [customers, pages];
    }
    catch (err) {
        console.error(err);
    }
}

const banCustomer = async (id) => {
    try {
        let customer = await user.findOne({ _id: id, role: false });
        customer.status = true;
        await customer.save();
    } catch (err) {
        console.log(err);
    }
}

const unbanCustomer = async (id) => {
    try {
        let customer = await user.findOne({ _id: id, role: false });
        customer.status = false;
        await customer.save();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    showListCustomer,
    banCustomer,
    unbanCustomer
}