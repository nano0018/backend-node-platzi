const express = require('express');
const ProductService = require('../services/product.service');
const service = new ProductService();
const router = express.Router();

router.get('/', (req, res) => {
  const products = service.find();
  res.json(products);
});

// Primero estáticos y particulares
router.get('/filter', (req, res) => {
  res.json({
    msg: 'Under construction!',
  });
});

// Luego dinámicos
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  if (!product) {
    res.json({
      msg: 'Not found!',
    });
  } else {
    res.json(product);
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json(newProduct);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.update(id, body);
  res.json(product);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.update(id, body);
  res.json(product);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const response = service.delete(id);
  res.json(response);
});

module.exports = router;
