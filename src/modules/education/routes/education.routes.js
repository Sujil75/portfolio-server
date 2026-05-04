const express = require('express');
const eduServices = require('../service/education.services');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const education = await eduServices.createEdu(req.body);
        res.json(education);
    }catch(err) {
        res.status(500).send(err.message);
    };
});

module.exports = router;