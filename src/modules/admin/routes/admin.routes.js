const express = require('express');
const adminService = require('../service/admin.services');

const router = express.Router();

const {
    registerAdmin,
    loginAdmin,
} = adminService;

router.post('/register', async (req, res) => {
    try {
        const admin = await registerAdmin(req.body);
        
        if (!admin) {
            res.status(401).json({
                message: "Admin not created",
                data: admin,
            });
        };

        res.status(201).json({
            message: "Admin Created Successfully",
            data: admin,
        });
    }catch (err) {
        res.status(500).json({
            message: "Data Error Found",
            data: err.message,
        });
    };
});

router.post('/login', async (req, res) => {
    try {
        const admin = await loginAdmin(req.body);

        if (!admin) {
            res.status(401).json({
                message: "Invalid Admin Found",
                data: admin,
            });
        };

        res.status(200).json({
            message: `Welcome, ${admin.name}`,
            data: admin,
        });
    }catch (err) {
        res.status(500).json({
            message: "Data Error Found",
            data: err.message,
        });
    };
});

module.exports = router;