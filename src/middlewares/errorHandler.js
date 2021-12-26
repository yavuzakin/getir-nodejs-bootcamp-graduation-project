module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
  
    res.status(err.statusCode).json({
        code: -1,
        msg: err.message
    });
};