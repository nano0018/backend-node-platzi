const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      delete user.dataValues.createdAt;
      const payload = {
        sub: user.id,
        role: user.role,
      };
      const token = jwt.sign(payload, config.jwtKey);
      res.json({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
