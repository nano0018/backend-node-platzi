const express = require('express');
const productsRouter = require('./products.routes');
const userRouter = require('./user.routes');
const categoryRouter = require('./category.routes');
const customerRouter = require('./customer.routes');
const orderRouter = require('./order.routes');
const authRouter = require('./auth.routes');

function routerAPI(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', userRouter);
  router.use('/categories', categoryRouter);
  router.use('/customers', customerRouter);
  router.use('/orders', orderRouter);
  router.use('/auth', authRouter);
}

module.exports = routerAPI;
