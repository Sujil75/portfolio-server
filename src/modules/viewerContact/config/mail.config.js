const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.OWNER_EMAIL_USER,
        pass: process.env.OWNER_EMAIL_PASS,
    },
});

transporter.verify((err, success) => {
    if (err) {
        console.error("Mail transporter not running", err);
    } else {
        console.log("Mail transporter running");
    };
});

module.exports = transporter;