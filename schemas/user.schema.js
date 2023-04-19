const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(25);
const username = Joi.string().min(3).max(15);
const age = Joi.number().integer().min(15);

const createUserSchema = Joi.object({
  name: name.required(),
  username: username.required(),
  age: age.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  username: username,
  age: age,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, getUserSchema, updateUserSchema };
