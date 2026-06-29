const errMiddleware = (err, req, res, next) => {
    const status = 500 || err.status;

    if (err.code === 11000) {
        return res.status(409).json({
            success: "Failed",
            status,
            code: 11000,
            message: "Duplicate key found",
        });
    };

    return res.status(status).json({
        success: "Failed",
        status,
        message: err.message || "Internal service error",
        errors: [] || err.errors,
    });
};

module.exports = errMiddleware;