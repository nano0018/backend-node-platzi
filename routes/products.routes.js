const express = require('express');
const ProductService = require('../services/product.service');
const { validatorHandler } = require('../middlewares/validator.handler');
const {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
} = require('../schemas/product.schema');
const service = new ProductService();
const router = express.Router();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

// Primero estáticos y particulares
router.get('/filter', (req, res) => {
  res.json({
    msg: 'Under construction!',
  });
});

// Luego dinámicos
router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      if (!product) {
        res.json({
          msg: 'Not found!',
        });
      } else {
        res.json(product);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

router.put(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
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
