const Joi = require('joi');

const id = Joi.number().integer();
const productId = Joi.number().integer();
const orderId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const createOrderProductSchema = Joi.object({
  productId: productId.required(),
  orderId: orderId.required(),
  amount: amount.required(),
});


const getOrderProductSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createOrderProductSchema,
  getOrderProductSchema,
};
