const user = require('../models/user');
const order = require('../models/order')
const product = require('../models/product')

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

const getListOrder = async () => {
    try {
        const orders = await order.find({}).lean();


        for (let i = 0; i < orders.length; i++) {
            const userOrder = await user.findOne({ _id: orders[i].userID }).lean();
            orders[i].email = userOrder.email;
            const date = new Date(orders[i].createdAt);
            const day = ("0" + date.getDate()).slice(-2);
            const month = ("0" + (date.getMonth() + 1)).slice(-2);
            const year = date.getFullYear();
            const hour = ("0" + date.getHours()).slice(-2);;
            const minute = ("0" + date.getMinutes()).slice(-2);;
            const second = ("0" + date.getSeconds()).slice(-2);;
            orders[i].createdAt = day + '/' + month + '/' + year;
            orders[i].time = hour + ':' + minute + ':' + second;

        }

        return orders;
    } catch (err) {
        console.log(err)
    }
}

const getDetailOrder = async (orderID) => {
    try {
        const userOrder = await order.findOne({ _id: orderID }).lean();
        const userInfo = await user.findOne({ _id: userOrder.userID }).lean();
        const products = [];

        for (let i = 0; i < userOrder.products.length; i++) {
            const temp = await product.findOne({ _id: userOrder.products[i].substring(userOrder.products[i].indexOf('-') + 1, userOrder.products[i].length) });
            products.push(temp);
        }

        for (let i = 0; i < userOrder.process.length; i++) {
            const date = new Date(userOrder.process[i].date);
            const day = ("0" + date.getDate()).slice(-2);
            const month = ("0" + (date.getMonth() + 1)).slice(-2);
            const year = date.getFullYear();
            const hour = ("0" + date.getHours()).slice(-2);;
            const minute = ("0" + date.getMinutes()).slice(-2);;
            const second = ("0" + date.getSeconds()).slice(-2);;
            userOrder.process[i].date = day + '/' + month + '/' + year;
            userOrder.process[i].time = hour + ':' + minute + ':' + second;
        }

        userOrder.process = userOrder.process.reverse();

        return [userInfo, products, userOrder];
    } catch (err) {
        console.log(err);
    }
}

const changeStatus = async (orderID, status) => {
    try {
        const userOrder = await order.findOne({ _id: orderID });
        userOrder.status = status;
        userOrder.process.push({ status: status, date: Date.now() })
        await userOrder.save();
        return 0; //sucess
    } catch (err) {
        console.log(err);
        return 1; //fail
    }
}

module.exports = {
    showListCustomer,
    banCustomer,
    unbanCustomer,
    getListOrder,
    getDetailOrder,
    changeStatus,
}