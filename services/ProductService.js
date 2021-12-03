const product = require('../models/product');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

const showListProduct = async (reqPage) => {
    try {
        let products = await (await product.find({}).lean()).reverse();
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

        return [products, pages];
    } catch (err) {
        console.log(err);
    }

    return [null, []];
}

const addNew = async (body, files) => {
    try {
        const urls = [];
        for (const file of files) {
            const { path } = file;
            const { public_id, secure_url } = await cloudinary.uploader.upload(path);

            urls.push({ public_id, secure_url })

            fs.unlinkSync(path)
        }

        const image = [];
        urls.forEach(item => {
            image.push(item)
        })

        const name = body.name.toLowerCase();
        const gender = body.gender === 'true' ? true : false;
        const description = body.description.split('\r\n');

        const newProduct = new product({ ...body, name, gender, description, image });
        await newProduct.save();
    } catch (err) {
        console.log(err);
    }
}

const deleleProduct = async (id) => {
    try {
        const delProduct = await product.findOne({ _id: id });

        for (let i = 0; i < delProduct.image.length; i++) {
            await cloudinary.uploader.destroy(delProduct.image[i].public_id);
        }

        await delProduct.remove();
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

const updateProduct = async (id, updatedProduct, files) => {
    try {
        if (files.length === 0) {
            await product.updateOne({ _id: id }, updatedProduct);
        } else {
            let oldProduct = await product.findById(id);
            console.log(oldProduct);

            const urls = [];
            for (let i = 0; i < oldProduct.image.length; i++) {
                await cloudinary.uploader.destroy(oldProduct.image[i].public_id);
            }

            for (const file of files) {
                const { path } = file;
                const { public_id, secure_url } = await cloudinary.uploader.upload(path);

                urls.push({ public_id, secure_url })

                fs.unlinkSync(path)
            }

            const image = [];
            urls.forEach(item => {
                image.push(item)
            })

            updatedProduct.image = image;
            await product.updateOne({ _id: id }, updatedProduct);
        }

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