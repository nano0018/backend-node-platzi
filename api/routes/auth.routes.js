const express = require('express');
const passport = require('passport');
const AuthService = require('../services/auth.service');
const router = express.Router();
const service = new AuthService();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const recovery = await service.sendResetPassword(email);
    res.json(recovery);
  } catch (error) {
    next(error);
  }
});

router.post('/change-password', async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const recovery = await service.changePassword(token, newPassword);
    res.json(recovery);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
