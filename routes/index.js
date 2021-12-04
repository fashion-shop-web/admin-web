const adminRouter = require('./admin');
const customerRouter = require('./customer');
const productRouter = require('./product');
const createError = require('http-errors');
const loginRouter = require('./login')
const loginGaurd = require('../utils/LoginGaurd');

function route(app) {

  //product management
  app.use('/product', loginGaurd, productRouter)

  //customer management
  app.use('/customer', loginGaurd, customerRouter);

  /* admin home page */
  app.use('/admin', loginGaurd, adminRouter);

  app.use('/', loginRouter);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
}


module.exports = route;
