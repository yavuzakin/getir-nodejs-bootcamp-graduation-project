const logger = require('./../scripts/logger/error');

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    
    logger.log({
        level: "error",
        message: `${err.statusCode} ${err.message}`
    });

    res.status(err.statusCode).json({
        code: -1,
        msg: err.message
    });
};