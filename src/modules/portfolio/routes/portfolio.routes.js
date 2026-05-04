const express = require('express');
const portfolioServices = require('../service/portfolio.services');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await portfolioServices.getPortfolio();

        if (!data) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;