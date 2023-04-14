const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

router.get('/', (req, res) => {
  const { size } = req.query;
  const categoriesArray = [];
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    categoriesArray.push({
      name: faker.commerce.department(),
      img: faker.image.imageUrl(),
    });
  }
  res.json(categoriesArray);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (parseInt(id) > 99 || parseInt(id) < 0) {
    res.status(404).json({
      msg: 'Not found',
    });
  } else {
    res.json({
      id,
      name: faker.commerce.department(),
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

router.get('/:catId/products/:prodId', (req, res) => {
  const { catId, prodId } = req.params;
  res.json({
    catId,
    prodId,
  });
});

module.exports = router;
