const express = require('express');
const Projects = require('../service/project.services');

const router = express.Router();
const {
    createProject,
    updateProject,
    deleteProject,
} = Projects;

router.post('/', async (req, res, next) => {
    try {
        const project = await createProject(req.body);
    
        if (!project || project.length === 0) {
            const err = new Error("No new projects created. Projects may already exists");
            err.status = 409;

            throw err;
        };

        res.status(200).json({
            message: "Project created successfully",
            data: project,
        });
    }catch(err) {
        next(err);
    };
});

router.put('/:id', async (req, res, next) => {
    try {
        const postData = await updateProject(req.params.id, req.body);

        if (!postData) {
            const err = new Error("No post data");
            err.status = 401;

            throw err;
        };

        return res.status(200).json({
            message: "Data updated successfully",
            data: postData,
        });
    }catch (err) {
        next(err);
    };
});

router.delete('/:id', async (req, res, next) => {
    try {
        const project = await deleteProject(req.params.id);

        if (!project) {
            // res.status(401).json({
            //     message: "Data Deletion Failed",
            //     data: project,
            // });
            const err = new Error("Data Deletion Failed");
            err.status = 401;

            throw err;
        };

        return res.status(200).send(project);
    }catch (err) {
        next(err);
    };
});

module.exports = router;