const mongoose = require('mongoose');

const contactme = new mongoose.Schema({
    contact_name: {
        type: String,
        trim: true,
        unique: true,
        require: true,
    },
    contact_type: {
        type: String,
        trim: true,
    },
    contact_number: {
        type: Number,
    },
    contact_link: {
        type: String,
        match: [/^(https?:\/\/[^\s$.?#].[^\s]*)$/, 'Please use a valid URL'],
        trim: true,
    },
    contact_logo: {
        type: String,
        match: [/^(https?:\/\/[^\s$.?#].[^\s]*)$/, 'Please use a valid URL'],
        trim: true,
    }
}, {
    collection: "contacts", // to specific collection name
});

module.exports = mongoose.model("ContactMe", contactme, "contacts");