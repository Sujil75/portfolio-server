const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
    image: {
        type: String,
        match: [/^(https?:\/\/[^\s$.?#].[^\s]*)$/, 'Please use a valid URL'],
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    brief_desc: {
        type: String,
        trim: true,
        maxlength: 200,
    },
    desc: {
        type: String,
        trim: true,
    },
    tech_stacks: [{
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 30,
    }],
    publish_link: {
        type: String,
        match: [/^(https?:\/\/[^\s$.?#].[^\s]*)$/, 'Please use a valid URL'],
        trim: true,
    },
    github_link: {
        type: String,
        match: [/^(https?:\/\/[^\s$.?#].[^\s]*)$/, 'Please use a valid URL'],
        trim: true,
    },
}, {
    timestamps: true,
});

const Projects = mongoose.model('Projects', projectsSchema);

module.exports = Projects;