const ContactMe = require('../service/contact.services');
const express = require('express');

const router = express.Router();
const {
    createContact,
    updateContact,
    deleteContact,
} = ContactMe;

router.post('/', async (req, res) => {
    try {
        const contact = await createContact(req.body);

        if (!contact || contact.length === 0) {
            res.status(401).json({
                message: "Contacts not create or Contact is already available",
                data: contact
            });
        };

        res.status(200).json({
            message: "Contact Created Successfully",
            data: contact,
        });
    }catch(err) {
        res.status(500).json({
            message: "Response Error",
            data: err.message,
        });
    };
});

router.put('/:id', async (req, res) => {
    try {
        const contact = await updateContact(req.params.id, req.body);

        if (!contact) {
            res.status(401).json({
                message: "Data didn't get updated",
                data: contact,
            });
        };

        res.status(200).json({
            message: `Data for ID: ${req.params.id} got updated`,
            data: contact,
        });
    }catch(err) {
        res.status(500).json({
            message: "Data Error Found",
            data: err.message,
        });
    };
});

router.delete('/:id', async (req, res) => {
    try {
        const contact = await deleteContact(req.params.id);

        if (!contact) {
            res.status(401).json({
                message: "Data Deletion Failed",
                data: contact,
            });
        };

        res.status(200).send(contact);
    }catch (err) {
        res.status(500).json({
            message: "Data Error Found",
            data: err.message,
        });
    };
});

module.exports = router;