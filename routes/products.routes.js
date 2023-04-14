const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

router.get('/', (req, res) => {
  const { size } = req.query;
  const productArray = [];
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    productArray.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      img: faker.image.imageUrl(),
    });
  }
  res.json(productArray);
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
  if (parseInt(id) > 99 || parseInt(id) < 0) {
    res.status(404).json({
      msg: 'Not found',
    });
  } else {
    res.json({
      id,
      name: 'Computer',
      price: 1000,
    });
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    msg: 'Created',
    data: body,
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    msg: 'Updated',
    id: id,
    data: body,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    msg: 'Updated',
    id: id,
    data: body,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    msg: 'Deleted',
    id: id,
  });
});

module.exports = router;
