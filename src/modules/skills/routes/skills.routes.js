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

router.put('/:id', async (req, res) => {
    try {
        const skill = await skillsServices.updateSkill(req.params.id, req.body);
        res.json(skill);
    }catch(err) {
        res.status(500).send(err.message);
    };
});

router.delete('/:id', async (req, res) => {
    try {
        const skill = await skillsServices.deleteSkill(req.params.is);
        res.json({message: "Skill Deleted"});
    }catch(err) {
        res.status(500).send(err.message);
    };
});

module.exports = router;