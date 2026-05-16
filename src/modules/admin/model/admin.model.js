const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    }
}, {
    timestamps: true,
    collection: "admin",
});

module.exports = mongoose.model("Admin", adminSchema, "admin");