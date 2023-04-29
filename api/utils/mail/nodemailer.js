const nodemailer = require('nodemailer');
require('dotenv').config();
const recoveryMailTemplate = require('../mail/template')

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true, // true for 465, false for other ports
    port: 465,
    auth: {
      user: process.env.BACKEND_MAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Servicio email - Backend NodeJS" <process.env.BACKEND_MAIL>', // sender address
    to: 'gregg13@ethereal.email', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Test email!', // plain text body
    html: recoveryMailTemplate('http://localhost:5050/browser'), // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendMail();
