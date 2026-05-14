const ContactMe = require('../service/contact.services');
const express = require('express');

const router = express.Router();
const {
    createContact,
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

module.exports = router;