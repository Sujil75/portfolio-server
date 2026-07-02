const express = require('express');
const userServices = require('../service/user.services');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const user = await userServices.createUser(req.body);

        if (!user) {
            const err = new Error("User Details not updated");
            err.status = 401;
            
            throw err;
        };

        res.status(200).json({
            message: "User updated successfully",
        });
    } catch(err) {
        next(err);
    };
});

router.put('/', async (req, res, next) => {
    try {
        const user = await userServices.updateUser(req.body);
        res.json(user);
    }catch(err) {
        next(err);
    };
});

module.exports = router;