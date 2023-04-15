const express = require('express');
const CategoryService = require('../services/category.service');
const service = new CategoryService();
const router = express.Router();

router.get('/', (req, res) => {
  const categories = service.find();
  res.json(categories);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = service.findOne(id);
  if (!category) {
    res.json({
      msg: 'Not found!',
    });
  } else {
    res.json(category);
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  const newCategory = service.create(body);
  res.status(201).json(newCategory);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const category = service.update(id, body);
  res.json(category);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const category = service.update(id, body);
  res.json(category);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const response = service.delete(id);
  res.json(response);
});

router.get('/:catId/products/:prodId', (req, res) => {
  const { catId, prodId } = req.params;
  res.json({
    catId,
    prodId,
  });
});

module.exports = router;
