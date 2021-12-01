const product = require('../models/product');

const showListProduct = async (reqPage) => {
    try {
        let products = await product.find({}).lean();
        const page = reqPage;
        const perPage = 10;

        const start = (page - 1) * perPage;
        const end = page * perPage;
        const pages = [];

        for (let count = 0; count < products.length / perPage; count++) {
            pages.push(count + 1);
        }

        products = products.slice(start, end);

        products = products.map(item => {
            return { ...item, gender: item.gender ? true : null };
        });

        return [products.reverse(), pages];
    } catch (err) {
        console.log(err);
    }

    return [null, []];
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

const getEditProduct = async (id) => {
    try {
        const editProduct = await product.findOne({ _id: id }).lean();

        return { ...editProduct, description: editProduct.description.join('\r\n') };
    } catch (err) {
        console.log(err);
    }

    return null;
}

const updateProduct = async (id, updatedProduct) => {
    try {
        await product.updateOne({ _id: id }, updatedProduct);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    showListProduct,
    addNew,
    deleleProduct,
    getEditProduct,
    updateProduct,
}