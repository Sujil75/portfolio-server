const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    description: String,
    brief_description: String,
    role: [String],
    resume: {
        type: String,
        match: [/^(https?:\/\/[^\s$.?#].[^\s]*)$/, 'Please use a valid URL'],
    },
    user_image_home: {
        type: String,
        match: [/^(https?:\/\/[^\s$.?#].[^\s]*)$/, 'Please use a valid URL'],
    },
    user_image_about: {
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
    }],
    contact_me: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ContactMe",
    }],
}, {
    timestamps: true,
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;