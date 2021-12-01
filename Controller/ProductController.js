const productService = require('../services/ProductService')

class ProductController {

    //[GET] product list
    async homePage(req, res) {
        const product = await productService.showListProduct();
        res.render('product/listProduct', { product });
    }

    //[GET] form add
    addForm(req, res) {
        res.render('product/addProduct');
    }

    //[POST] store to database
    async store(req, res) {
        productService.addNew(req.body);
        const product = await productService.showListProduct();
        res.redirect(301, '/product');
    }

    async deleteProduct(req, res) {
        productService.deleleProduct(req.params.id);
        res.redirect(301, '/product');
    }
}

module.exports = new ProductController;