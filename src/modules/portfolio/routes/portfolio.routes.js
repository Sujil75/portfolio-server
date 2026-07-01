const express = require('express');
const portfolioServices = require('../service/portfolio.services');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const data = await portfolioServices.getPortfolio();

        if (!data) {
            const err = new Error("Portfolio not found");
            err.status = 404;

            throw err;
        }

        res.json(data);
    } catch (err) {
        err.status = 500;
        next(err);
    }
});

module.exports = router;