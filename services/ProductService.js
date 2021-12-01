const product = require('../models/product');

const showListProduct = async () => {
    try {
        let products = await product.find({}).lean();

        products = products.map(item => {
            return { ...item, gender: item.gender ? true : null };
        });

        return products.reverse();
    } catch (err) {
        console.log(err);
    }

    return null;
}

const addNew = (body) => {
    try {
        const gender = body.gender === 'true' ? true : false;
        const description = body.description.split('\r\n');

        const newProduct = new product({ ...body, gender, description });
        newProduct.save()
    } catch (err) {
        console.log(err);
    }
}

const deleleProduct = async (id) => {
    try {
        await product.deleteOne({ _id: id });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    showListProduct,
    addNew,
    deleleProduct,
}