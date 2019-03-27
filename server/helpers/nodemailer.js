"use strict";
require('dotenv').config();
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
function main(data ,done){

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let account = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email, // generated ethereal user
      pass: process.env.password // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"HacktivOverflow" <hacktivoverflow-no-reply@willy.web.id>', // sender address
    to: data.email, // list of receivers
    subject: data.title, // Subject line
    // text: "Hello world?", // plain text body
    html: data.message // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
      done()
    }
  })

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = main