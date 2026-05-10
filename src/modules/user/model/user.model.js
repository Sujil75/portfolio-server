const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    description: String,
    brief_description: String,
    role: [String],
    resume: {
        type: String,
        match: [/^(https?:\/\/[^\s$.?#].[^\s]*)$/, 'Please use a valid URL'],
    },
    user_image: {
        type: String,
        match: [/^(https?:\/\/[^\s$.?#].[^\s]*)$/, 'Please use a valid URL'],
    },
    skills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skills",
    }],
    educations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Education",
    }],
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Projects"
    }]
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;