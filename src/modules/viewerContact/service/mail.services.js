const brevoClient = require('../config/mail.config');
require('dotenv').config();

const sendContactMail = async data => {
    try {
        const response = await brevoClient.post(
            "/smtp/email",
            {
                sender: {
                    email: data.mail,
                    name: "Portfolio",
                },

                to: [{
                    email: process.env.OWNER_EMAIL_USER
                }],
                
                replyTo: {
                    email: data.mail,
                    name: data.name,
                },

                subject: `Portfolio Contact: ${data.subject}`,

                htmlContent: `
                    <h2>New Contact Form</h2>

                    <p><b>Name: </b>${data.name}</p>

                    <p><b>Email: </b>${data.mail}</p>
                    
                    <p><b>Viewer Type: </b>${data.type}</p>

                    <p><b>Message:</b></p>

                    <p>${data.message}</p>
                `
            }
        );

        return response.data;
    } catch(err) {
        throw new Error(
            err.response?.data?.message || err.message || "Mail sending failed"
        );
    };
};

module.exports = {
    sendContactMail
};