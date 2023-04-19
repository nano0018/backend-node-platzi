const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const img = Joi.string().uri();

const createCategorySchema = Joi.object({
  name: name.required(),
  img: img.required(),
});

const updateCategorySchema = Joi.object({
  name: name,
  img: img,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createCategorySchema, getCategorySchema, updateCategorySchema };
