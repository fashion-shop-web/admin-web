const productService = require('../services/ProductService')

class ProductController {

    async homePage(req, res) {
        const product = await productService.showListProduct();
        res.render('product/listProduct', { product });
    }
}

module.exports = new ProductController;