const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true,
        match: [
            /^\S+@\S+\.\S+$/,
            'Please provide a valid email'
        ]
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    admin: {
        type: Boolean,
        required: true,
        trim: true,
        lowercase: true,
    }
}, {
    timestamps: true,
    collection: "admin",
});

module.exports = mongoose.model("Admin", adminSchema, "admin");