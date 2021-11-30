const product = require('../models/product');

const showListProduct = async () => {
    try {
        let products = await product.find({}).lean();

        products = products.map(item => {
            return { ...item, gender: item.gender ? true : null };
        });

        return products;
    } catch (err) {
        console.log(err);
    }

    return null;
}

module.exports = {
    showListProduct
}