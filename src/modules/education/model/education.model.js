const mongoose = require('mongoose')

const eduSchema = new mongoose.Schema({
    certificate_img: {
        type: String,
        match: [/^(https?:\/\/[^\s$.?#].[^\s]*)$/, 'Please use a valid URL']
    },
    drive_link: {
        type: String,
        match: [/^(https?:\/\/[^\s$.?#].[^\s]*)$/, 'Please use a valid URL']
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    institute_name: {
        type: String,
        required: true,
        trim: true,
    },
    brief_description: String,
    issued_on: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});

const eduModel = mongoose.model('Education', eduSchema);

module.exports = eduModel;