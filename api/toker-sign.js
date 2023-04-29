const jwt = require('jsonwebtoken');

const secret = 'mySecret';

const payload = {
  sub: 1,
  role: 'customer',
};

const signToken = (payload, secret) => {
  return jwt.sign(payload, secret);
};

const token = signToken(payload, secret);
console.log(token);
