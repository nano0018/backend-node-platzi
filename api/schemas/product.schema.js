const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(100);
const description = Joi.string().min(10).max(350);
const img = Joi.string().uri();
const categoryId = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  img: img.required(),
  description: description.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  img: img,
  description: description,
  categoryId: categoryId,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, getProductSchema, updateProductSchema };
