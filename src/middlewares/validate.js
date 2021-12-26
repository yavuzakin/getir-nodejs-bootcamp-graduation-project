const ApiError = require('./../scripts/utils/ApiError');

const validate = (schema, source) => (req, res, next) => {

    const { value, error } = schema.validate(req[source]);

    if (error) {
        const errorMessage = error?.details
            ?.map((detail) => detail?.message)
            .join(", ");

        return next(new ApiError(errorMessage, 400));
    }
    Object.assign(req, value);
    return next();
};

module.exports = validate;