const express = require('express');
const { faker } = require('@faker-js/faker');
const router = express.Router();

router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  const { size } = req.query;
  const usersArray = [];
  const limitSize = size || 10;
  if (offset && limit) {
    res.json({
      limit,
      offset,
    });
  } else {
    for (let index = 0; index < limitSize; index++) {
      usersArray.push({
        name: faker.name.fullName(),
        username: `${faker.hacker.noun()}${faker.random.numeric(3)}`,
        age: faker.random.numeric(2),
      });
    }
    res.json(usersArray);
  }
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
      name: faker.name.fullName(),
      username: `${faker.hacker.noun()}${faker.random.numeric(3)}`,
      age: faker.random.numeric(2),
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
