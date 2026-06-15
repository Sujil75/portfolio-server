const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.OWNER_EMAIL_USER,
        pass: process.env.OWNER_EMAIL_PASS,
    },
});

transporter.verify((err, success) => {
    if (err) {
        return new Error('Mail Error');
        console.error("Mail transporter not running");
    } else {
        console.log("Mail transporter running");
    };
});

module.exports = transporter;