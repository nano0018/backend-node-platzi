const express = require('express');
const UserService = require('../services/user.service');
const { validatorHandler } = require('../middlewares/validator.handler');
const {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
} = require('../schemas/user.schema');
const service = new UserService();
const router = express.Router();

router.get('/', (req, res) => {
  const users = service.find();
  res.json(users);
});

router.get('/:id', validatorHandler(getUserSchema, 'params'), (req, res) => {
  const { id } = req.params;
  const user = service.findOne(id);
  if (!user) {
    res.json({
      msg: 'Not found!',
    });
  } else {
    res.json(user);
  }
});

router.post('/', validatorHandler(createUserSchema, 'body'), (req, res) => {
  const body = req.body;
  const newUser = service.create(body);
  res.status(201).json(newUser);
});

router.put(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const response = service.delete(id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
