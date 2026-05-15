const express = require('express');
const Projects = require('../service/project.services');

const router = express.Router();
const {
    createProject,
    updateProject,
    deleteProject,
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

router.put('/:id', async (req, res) => {
    try {
        const postData = await updateProject(req.params.id, req.body);

        if (!postData) {
            return res.status(401).json({
                message: "No Post Data",
                data: postData,
            })
        };

        return res.status(200).json({
            message: "Data updated successfully",
            data: postData,
        });
    }catch (err) {
        res.status(500).json({
            message: "Found Error",
            data: err.message,
        });
    };
});

router.delete('/:id', async (req, res) => {
    try {
        const project = await deleteProject(req.params.id);

        if (!project) {
            res.status(401).json({
                message: "Data Deletion Failed",
                data: project,
            });
        };

        return res.status(200).send(project);
    }catch (err) {
        res.status(500).json({
            message: "Data Error Found",
            data: err.message,
        })
    };
});

module.exports = router;