const express = require('express')

const authMiddleware = (req, res, next) => {
    console.log("Requested method:", req.method);
    next();
};

module.exports = authMiddleware;