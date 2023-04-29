const boom = require('@hapi/boom');
const { config } = require('../config/config');

const checkAPIKey = (req, res, next) => {
  const APIKey = req.headers['x-api-key'];
  if (APIKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
};

const checkAdminRole = (req, res, next) => {
  const user = req.user;
  if (user.role === 'admin') {
    next();
  } else {
    next(boom.unauthorized());
  }
};

const checkRoles = (...roles) => {
  return (req, res, next) => {
    const user = req.user;
    console.log(user);
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
};

module.exports = { checkAPIKey, checkAdminRole, checkRoles };
