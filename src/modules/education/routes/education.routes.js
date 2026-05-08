const express = require('express');
const eduServices = require('../service/education.services');

const router = express.Router();

const {
    createEdu,
    updateEdu,
    deleteEdu,
} = eduServices;

router.post('/', async (req, res) => {
    try {
        const education = await createEdu(req.body);
        res.json({
            message: "Education created successfully",
            data: education,
        });
    }catch(err) {
        res.status(500).send(err.message);
    };
});

router.put('/:id', async (req, res) => {
    try {
        const education = await updateEdu(req.params.id, req.body);

        if (!education) {
            return res
                    .status(404)
                    .send(`No education with id: ${req.params.id} found`);
        }

        res.json({
            message: `Education with ${req.params.id} updated successfully`,
            data: education
        });
    }catch(err) {
        res.status(500).send(err.message);
    };
});

router.delete('/:id', async (req,res) => {
    try {
        const education = await deleteEdu(req.params.id);

        if (!education) {
            return res
                .status(404)
                .send(`No education with id: ${req.params.id} found`);
        }

        res.json({
            message: `Education with ${req.params.id} deleted successfully`,
            data: education,
        });
    }catch(err) {
        res.status(500).send(`Error during deletion of education object with \n id: ${req.params.id} \n Error: `, err.message)
    };
});

module.exports = router;