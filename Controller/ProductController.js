const productService = require('../services/ProductService')

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
        productService.addNew(req.body);
        const product = await productService.showListProduct();
        res.redirect(301, '/product');
    }

    async deleteProduct(req, res) {
        productService.deleleProduct(req.params.id);
        res.redirect(301, '/product');
    }

    async editForm(req, res) {
        const editProduct = await productService.getEditProduct(req.params.id);
        res.render('product/editProduct', { editProduct });
    }

    async updateProduct(req, res) {
        await productService.updateProduct(req.params.id, req.body);
        res.redirect(301, '/product');
    }
}

module.exports = new ProductController;