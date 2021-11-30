class ProductController {

    homePage(req, res) {
        res.render('product');
    }
}

module.exports = new ProductController;