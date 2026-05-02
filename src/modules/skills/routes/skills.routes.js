const express = require('express');
const skillsServices = require('../service/skills.services');

const router = express.Router();

router.post('/', (req, res) => {
    try {
        const skill = skillsServices.createSkills(req.body);
        res.json(skill);
    }catch(err) {
        res.status(500).send(err.message);
    };
});

router.get('/', (req, res) => {
    try {
        const skill = skillsServices.getSkills();
        res.json(skill);
    }catch(err) {
        res.status(500).send(err.message);
    };
});

module.exports = router;