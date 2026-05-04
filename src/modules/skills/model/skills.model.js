const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    skill_name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    skill_image: {
        type: String,
        match: [/^(https?:\/\/[^\s$.?#].[^\s]*)$/, 'Please use a valid URL'],
        default: "",
    },
    skill_progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
    },
});

module.exports = mongoose.model('Skills', skillSchema);