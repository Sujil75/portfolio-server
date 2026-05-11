const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
    project_img: {
        type: String,
        match: [/^(https?:\/\/[^\s$.?#].[^\s]*)$/, 'Please use a valid URL'],
        trim: true,
    },
    project_publish_link: {
        type: String,
        match: [/^(https?:\/\/[^\s$.?#].[^\s]*)$/, 'Please use a valid URL'],
        trim: true,
    },
    project_name: {
        type: String,
        required: true,
        trim: true,
    },
    project_brief: {
        type: String,
        trim: true,
        maxlength: 200,
    },
    project_desc: {
        type: String,
        trim: true,
    },
    project_stacks: [{
        type: String,
        lowercase: true,
        trim: true,
        minlength: 1,
        maxlength: 30,
    }, {
        timestamps: true,
    }],
});

const Projects = mongoose.model('Projects', projectsSchema);

module.exports = Projects;