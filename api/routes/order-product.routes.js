const express = require('express');
const OrderProductService = require('../services/order-product.service');
const { validatorHandler } = require('../middlewares/validator.handler');
const {
  createOrderProductSchema,
  getOrderProductSchema,
  updateOrderProductSchema,
} = require('../schemas/order-product.schema');
const service = new OrderProductService();
const router = express.Router();

router.post('/', validatorHandler(createOrderProductSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
  const newOrderProduct = await service.create(body);
  res.status(201).json(newOrderProduct);
  } catch (error) {
    next(error);
  }
});

router.put(
  '/:id',
  validatorHandler(getOrderProductSchema, 'params'),
  validatorHandler(updateOrderProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const orderProduct = await service.update(id, body);
      res.json(orderProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getOrderProductSchema, 'params'),
  validatorHandler(updateOrderProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const order = await service.update(id, body);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getOrderProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await service.delete(id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
