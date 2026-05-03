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

router.put('/', async (req, res) => {
    try {
        const user = await userServices.updateUser(req.body);
        res.json(user);
    }catch(err) {
        res.status(500).send(err.message);
    };
});

module.exports = router;