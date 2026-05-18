const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        
        if (!authHeader) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        };

        const token = authHeader.split(' ')[1];
        
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!verifyToken) {
            return res.status(401).json({
                message: "Invalid Token",
            });
        }

        if (verifyToken.role !== "admin") res.status(403).json({message: 'Forbidden'});

        req.admin = verifyToken;

        next();
    }catch(err) {
        return res.status(401).json({
            message: err.message,
        });
    };
};

module.exports = authMiddleware;