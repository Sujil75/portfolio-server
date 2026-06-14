const mongoose = require('mongoose');

const contactmeSchema = new mongoose.Schema({
    contact_name: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    contact_type: {
        type: String,
        trim: true,
    },
    contact_link: {
        type: String,
        validate: {
            validator: function(value) {
                const uriRegex = /^https?:\/\/[^\s]+$/i;
                const mailRegex = /^mailto:[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
                
                return (
                    uriRegex.test(value) ||
                    mailRegex.test(value)
                );
            },
                message: 'Please provide a valid URL or mailto link'
        },
        trim: true,
    },
    contact_logo: {
        type: String,
        match: [/^(https?:\/\/[^\s$.?#].[^\s]*)$/, 'Please use a valid URL'],
        trim: true,
    }
}, {
    timestamps: true,
    collection: "contacts", // to specific collection name
});

module.exports = mongoose.model("ContactMe", contactmeSchema, "contacts");