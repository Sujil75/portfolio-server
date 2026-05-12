const express = require('express');
const Projects = require('../service/project.services');

const router = express.Router();
const {
    createProject,
} = Projects;

router.post('/', async (req, res) => {
    try {
        const project = await createProject(req.body);
    
        if (!project) {
            return res.status(400).send({
                message: "Entered Data Error",
                data: project,
            });
        };

        res.status(200).json({
            message: "Project created successfully",
            data: project,
        });
    }catch(err) {
        res.status(500).send("Response error: ", err.message);
    };
});

module.exports = router;