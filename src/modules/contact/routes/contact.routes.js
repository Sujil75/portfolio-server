const ContactMe = require('../service/contact.services');
const express = require('express');

const router = express.Router();
const {
    createContact,
    updateContact,
    deleteContact,
} = ContactMe;

router.post('/', async (req, res, next) => {
    try {
        const contact = await createContact(req.body);

        if (!contact || contact.length === 0) {
            // res.status(401).json({
            //     message: "Contacts not create or Contact is already available",
            //     data: contact
            // });
            
            const err = new Error("Contacts not create or Contact is already available");
            err.status = 401;

            throw err;
        };

        res.status(200).json({
            message: "Contact Created Successfully",
            data: contact,
        });
    }catch(err) {
        next(err);
    };
});

router.put('/:id', async (req, res, next) => {
    try {
        const contact = await updateContact(req.params.id, req.body);

        if (!contact) {
            // res.status(401).json({
            //     message: "Data didn't get updated",
            //     data: contact,
            // });

            const err = new Error("Data didn't get updated");
            err.status = 401;

            throw err;
        };

        res.status(200).json({
            message: `Data for ID: ${req.params.id} got updated`,
            data: contact,
        });
    }catch(err) {
        next(err);
    };
});

router.delete('/:id', async (req, res, next) => {
    try {
        const contact = await deleteContact(req.params.id);

        if (!contact) {
            // res.status(401).json({
            //     message: "Data Deletion Failed",
            //     data: contact,
            // });
            
            const err = new Error("Data Deletion Failed");
            err.status = 404;

            throw err;
        };

        res.status(200).send(contact);
    }catch (err) {
        next(err);
    };
});

module.exports = router;