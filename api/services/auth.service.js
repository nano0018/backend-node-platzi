const { config } = require('../config/config');
const UserService = require('../services/user.service');
const service = new UserService();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const recoveryMailTemplate = require('../utils/mail/template');

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    delete user.dataValues.role;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    delete user.dataValues.createdAt;
    const token = jwt.sign(payload, config.jwtKey);
    return {
      user,
      token,
    };
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtRecoveryKey);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {
        recoveryToken: null,
        password: hash,
      });
      return {
        msg: 'The password has been changed',
      };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendResetPassword(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      return {
        msg: 'An email with recovery instructions has been sent!',
      };
    }
    const payload = {
      sub: user.id,
    };
    const token = jwt.sign(payload, config.jwtRecoveryKey, {
      expiresIn: '15min',
    });
    const link = `http://frontend.store.co/recovery?token=${token}`;

    await service.update(user.id, {
      recoveryToken: token,
    });

    const mail = {
      from: `"Servicio email - Backend NodeJS" <${config.recoveryServiceEmail}>`, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Recuperación de contraseña', // Subject line
      html: recoveryMailTemplate(link), // html body
    };

    const mailSent = await this.sendMail(mail);
    return mailSent;
  }

  async sendMail(infoMail) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.recoveryServiceEmail,
        pass: config.recoveryServicePassword,
      },
    });

    // send mail with defined transport object
    await transporter.sendMail(infoMail);

    return {
      msg: 'An email with recovery instructions has been sent!',
    };
  }
}
module.exports = AuthService;
