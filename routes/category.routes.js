const express = require('express');
const CategoryService = require('../services/category.service');
const { validatorHandler } = require('../middlewares/validator.handler');
const {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} = require('../schemas/category.schema');
const service = new CategoryService();
const router = express.Router();

router.get('/', (req, res) => {
  const categories = service.find();
  res.json(categories);
});

router.get(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  (req, res, next) => {
    const { id } = req.params;
    const category = service.findOne(id);
    try {
      if (!category) {
        res.json({
          msg: 'Not found!',
        });
      } else {
        res.json(category);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', validatorHandler(createCategorySchema, 'body'), (req, res) => {
  const body = req.body;
  const newCategory = service.create(body);
  res.status(201).json(newCategory);
});

router.put(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
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

router.get('/:catId/products/:prodId', (req, res) => {
  const { catId, prodId } = req.params;
  res.json({
    catId,
    prodId,
  });
});

module.exports = router;
