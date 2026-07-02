const express = require('express');
const skillsServices = require('../service/skills.services');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const skill = await skillsServices.createSkills(req.body);
        res.json(skill);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const skill = await skillsServices.updateSkill(req.params.id, req.body);

        if (!skill) {
            const err = new Error('Skill not found');
            err.status = 404;
            
            throw err;
        }

        res.json(skill);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const skill = await skillsServices.deleteSkill(req.params.id); // ✅ FIXED

        if (!skill) {
            const err = new Error('Skill not found');
            err.status = 404;
            
            throw err;
        }

        res.json({ message: "Skill Deleted" });
    } catch (err) {
        next(err);
    }
});

module.exports = router;