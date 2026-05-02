const express = require('express');
const skillsServices = require('../service/skills.services');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const skill = await skillsServices.createSkills(req.body);
        res.json(skill);
    }catch(err) {
        res.status(500).send(err.message);
    };
});

router.get('/', async (req, res) => {
    try {
        const skill = await skillsServices.getSkills();
        res.json(skill);
    }catch(err) {
        res.status(500).send(err.message);
    };
});

module.exports = router;