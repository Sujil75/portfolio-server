const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const { collection } = require('../../skills/model/skills.model');

const viewContactSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    mail: {
        type: String,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        unique: true,
    },
    viewer: String,
    subject: {
        type: String,
        trim: true,
        min: 0,
        max: 150,
    },
    message: {
        type: String,
        trim: true,
    }
}, {
    Timestamp: true,
    collection: "viewcontacts",
});

module.exports = mongoose.model("ViewContact", viewContactSchema, "viewcontacts");