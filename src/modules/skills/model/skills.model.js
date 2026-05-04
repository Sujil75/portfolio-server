const mongoose = require('mongoose')

const skillSchema = mongoose.Schema({
    skill_name: String,
    skill_image: {
        type: String,
        match: [/^(https?:\/\/[^\s$.?#].[^\s]*)$/, 'Please use a valid URL'],
    },
    skill_progress: Number,
});

const skillModel = mongoose.model('skills', skillSchema);

module.exports = skillModel;