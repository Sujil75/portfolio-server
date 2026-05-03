const express = require('express');
const portfolioServices = require('../service/portfolio.services');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await portfolioServices.getPortfolio();
        res.json(data);
    }catch(err) {
        res.status(500).send(err.message);
    };
});

module.exports = router;