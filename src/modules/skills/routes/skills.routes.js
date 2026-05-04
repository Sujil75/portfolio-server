const express = require('express');
const skillsServices = require('../service/skills.services');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const skill = await skillsServices.createSkills(req.body);
        res.json(skill);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const skill = await skillsServices.updateSkill(req.params.id, req.body);

        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        res.json(skill);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const skill = await skillsServices.deleteSkill(req.params.id); // ✅ FIXED

        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        res.json({ message: "Skill Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;