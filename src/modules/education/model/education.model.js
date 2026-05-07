const mongoose = require('mongoose')

const eduSchema = mongoose.Schema({
    education_name: {
        type: String,
        required: true,
    },
    education_desc: String,
    education_certificate_img: {
        type: String,
        match: [/^(https?:\/\/[^\s$.?#].[^\s]*)$/, 'Please use a valid URL']
    },
})

const eduModel = mongoose.model('Education', eduSchema);

module.exports = eduModel;