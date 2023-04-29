const express = require('express');
const authRouter = require('./auth.routes');
const productsRouter = require('./products.routes');
const userRouter = require('./user.routes');
const categoryRouter = require('./category.routes');
const customerRouter = require('./customer.routes');
const orderRouter = require('./order.routes');
const profileRouter = require('./profile.routes');

function routerAPI(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/auth', authRouter);
  router.use('/products', productsRouter);
  router.use('/users', userRouter);
  router.use('/categories', categoryRouter);
  router.use('/customers', customerRouter);
  router.use('/orders', orderRouter);
  router.use('/profile', profileRouter);
}

module.exports = routerAPI;
