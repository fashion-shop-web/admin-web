const productService = require('../services/ProductService');


class ProductController {

    //[GET] product list
    async homePage(req, res) {
        let currentPage = parseInt(req.query.page) || 1;
        const [product, pages] = await productService.showListProduct(currentPage);
        res.render('product/listProduct', { product, pages, currentPage });
    }

    //[GET] form add
    addForm(req, res) {
        res.render('product/addProduct');
    }

    //[POST] store to database
    async store(req, res) {
        await productService.addNew(req.body, req.files);
        res.redirect(301, '/product');
    }

    // [DELETE] delete a product
    async deleteProduct(req, res) {
        await productService.deleleProduct(req.params.id);
        res.redirect(301, `/product?page=${req.query.page}`);
    }

    //[GET] edit from
    async editForm(req, res) {
        const editProduct = await productService.getEditProduct(req.params.id);
        res.render('product/editProduct', { editProduct });
    }

    //[PUT] store new product info to database
    async updateProduct(req, res) {
        await productService.updateProduct(req.params.id, req.body, req.files);
        res.redirect(301, '/product');
    }

    async showStatistical(req, res) {
        res.render('product/statistical');
    }
}

module.exports = new ProductController;