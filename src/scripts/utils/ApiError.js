class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.code = -1;
    }
}
  
module.exports = AppError;