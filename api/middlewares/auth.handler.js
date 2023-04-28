const boom = require('@hapi/boom');
const { config } = require('../config/config')

const checkAPIKey = (req, res, next) => {
  const APIKey = req.headers['x-api-key'];
  if (APIKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
};

module.exports = { checkAPIKey }
