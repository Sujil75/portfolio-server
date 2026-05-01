const express = require('express');
const userServices = require('../service/user.services');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const user = await userServices.createUser(req.body);
        res.json(user);
    } catch(err) {
        res.status(500).send(err.message);
    };
});

router.get('/', async (req, res) => {
    const user = await userServices.getUser();
    res.json(user);
});

module.exports = router;