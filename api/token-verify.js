const jwt = require('jsonwebtoken');

const secret = 'mySecreta';

const token = '';

const verify = (token, secret) => {
  return jwt.verify(token, secret);
};

const payload = verify(token, secret);
console.log(payload);
