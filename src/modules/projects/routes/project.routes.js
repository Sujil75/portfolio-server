const express = require('express');
const Projects = require('../service/project.services');

const router = express.Router();
const {
    createProject,
} = Projects;

router.post('/', async (req, res) => {
    try {
        const project = await createProject(req.body);
    
        if (!project || project.length === 0) {
            return res.status(409).json({
                message: "No new projects created. Projects may already exists",
                data: [],
            });
        };

        res.status(200).json({
            message: "Project created successfully",
            data: project,
        });
    }catch(err) {
        res.status(500).json({
            message: "Response error",
            data: err.message,
        });
    };
});

module.exports = router;