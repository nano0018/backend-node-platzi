const express = require('express');
const OrderService = require('../services/order.service');
const { validatorHandler } = require('../middlewares/validator.handler');
const {
  createOrderSchema,
  getOrderSchema,
  updateOrderSchema,
} = require('../schemas/order.schema');
const service = new OrderService();
const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories);
});

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);

    } catch (error) {
      next(error);
    }
  }
);

router.post('/', validatorHandler(createOrderSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
  const newOrder = await service.create(body);
  res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

router.put(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
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

router.patch(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
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
  validatorHandler(getOrderSchema, 'params'),
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
