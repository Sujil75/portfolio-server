const transporter = require('../config/mail.config');
require('dotenv').config();

const sendContactMail = async data => {
    await transporter.sendMail({
        from: process.env.OWNER_EMAIL_USER,
        to: data.mail,

        subject: `Portfolio Contact: ${data.subject}`,

        html: `
            <h2>New Contact Form</h2>

            <p><b>Name: </b>${data.name}</p>

            <p><b>Email: </b>${data.mail}</p>
            
            <p><b>Viewer Type: </b>${data.viewer}</p>

            <p><b>Message:</b></p>

            <p>${data.message}</p>
        `
    });
};

module.exports = {
    sendContactMail
};