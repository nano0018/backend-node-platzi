const express = require('express');
const ProductService = require('../services/product.service');
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
router.get('/:id', async (req, res, next) => {
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
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = await service.update(id, body);
  res.json(product);
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await service.delete(id);
  res.json(response);
});

module.exports = router;
