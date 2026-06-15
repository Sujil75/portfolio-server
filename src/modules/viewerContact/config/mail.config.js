const axios = require('axios');
require('dotenv').config();

if (!process.env.BREVO_API_KEY) {
    throw new Error("Brevo Key not received");
}

const brevoClient = axios.create({
    baseURL: "https://api.brevo.com/v3/",

    headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json"
    }
});

module.exports = brevoClient;