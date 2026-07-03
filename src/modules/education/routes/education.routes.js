const express = require('express');
const eduServices = require('../service/education.services');

const router = express.Router();

const {
    createEdu,
    updateEdu,
    deleteEdu,
} = eduServices;

router.post('/', async (req, res, next) => {
    try {
        const education = await createEdu(req.body);
        res.json({
            message: "Education created successfully",
            data: education,
        });
    }catch(err) {
        next(err);
    };
});

router.put('/:id', async (req, res, next) => {
    try {
        const education = await updateEdu(req.params.id, req.body);

        if (!education) {
            const err = new Error(`No education with id: ${req.params.id} found`);
            err.status = 404;
            
            throw err;
        }

        res.json({
            message: `Education with ${req.params.id} updated successfully`,
            data: education
        });
    }catch(err) {
        next(err);
    };
});

router.delete('/:id', async (req,res, next) => {
    try {
        const education = await deleteEdu(req.params.id);

        if (!education) {
            const err = new Error(`No education with id: ${req.params.id} found`);
            err.status = 404;
            
            throw err;
        }

        res.json({
            message: education,
        });
    }catch(err) {
        next(err);
    };
});

module.exports = router;