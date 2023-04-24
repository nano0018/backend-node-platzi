const { ValidationError } = require('sequelize');
const boom = require('@hapi/boom');
function queryErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    throw boom.conflict(err.errors[0].message);
  }
  next(err);
}

module.exports = queryErrorHandler
