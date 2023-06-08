const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.auth.user,
    pass: process.env.auth.pass
  },
});

module.exports = transporter;
