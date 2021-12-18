const product = require('../models/product');
const order = require('../models/order');
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

const GetProductChartDay = async () => {
    try {
        let products = await order.find({}).lean();
        const ys =[];
        for (let i = 0; i < products.length; i++) {
            const date = new Date(products[i].createdAt);
            const day = ("0" + date.getDate()).slice(-2);
            const month = ("0" + (date.getMonth() + 1)).slice(-2);
            const year = date.getFullYear();
            products[i].createdAt = day + '/' + month + '/' + year;
            ys.push(products[i].createdAt);
        }
        const uniqueday = [...new Set(ys)];

        const count =[];

        for (let i = 0; i < uniqueday.length; i++) 
        {
            var tempcount = 0;
            const tempdate = uniqueday[i].split('/');

            var month = parseInt(tempdate[1]) - 1;

            const start = new Date(tempdate[2],month,tempdate[0]);

            const end  =  new Date(tempdate[2],month,tempdate[0],23,59,59);

            let countselling = await order.find({createdAt: {$gte: start, $lt: end}});

            for(let j = 0; j < countselling.length; j++)
            {
                tempcount += countselling[j].products.length;
            }
            count.push(tempcount);
        }

        return [uniqueday, count];
    } catch (err) {
        console.log(err);
    }
}

const GetProductChartMonth = async () => {
    try {
        let products = await order.find({}).lean();
        const ys =[];
        for (let i = 0; i < products.length; i++) {
            const date = new Date(products[i].createdAt);
            const month = ("0" + (date.getMonth() + 1)).slice(-2);
            const year = date.getFullYear();
            products[i].createdAt = month + '/' + year;
            ys.push(products[i].createdAt);
        }
        const uniquemonth = [...new Set(ys)];

        const count =[];

        for (let i = 0; i < uniquemonth.length; i++) 
        {
            var tempcount = 0;
            const tempdate = uniquemonth[i].split('/');
            var month = parseInt(tempdate[0]) - 1;
            const start = new Date(tempdate[1],month, 1);
            var nextmonth = month + 1;
            const end  =  new Date(tempdate[1],nextmonth, 0);


            let countselling = await order.find({createdAt: {$gte: start, $lt: end}});

            for(let j = 0; j < countselling.length; j++)
            {
                tempcount += countselling[j].products.length;
            }
            count.push(tempcount);
        }

        return [uniquemonth, count];
    } catch (err) {
        console.log(err);
    }
}

const GetProductChartYear = async () => {
    try {
        let products = await order.find({}).lean();
        const ys =[];
        for (let i = 0; i < products.length; i++) {
            const date = new Date(products[i].createdAt);
            const year = date.getFullYear();
            products[i].createdAt = year;
            ys.push(products[i].createdAt);
        }
        const uniqueyear = [...new Set(ys)];

        const count =[];

        for (let i = 0; i < uniqueyear.length; i++) 
        {
            var tempcount = 0;
            const start = new Date(uniqueyear[i],0, 1);
            const end  =  new Date(uniqueyear[i],11, 31,23,59,59);

            let countselling = await order.find({createdAt: {$gte: start, $lt: end}});

            for(let j = 0; j < countselling.length; j++)
            {
                tempcount += countselling[j].products.length;
            }
            count.push(tempcount);
        }

        return [uniqueyear, count];
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
    GetProductChartDay,
    GetProductChartMonth,
    GetProductChartYear,
}