const validate = (schema, source) => (req, res, next) => {

    const { value, error } = schema.validate(req[source]);

    if (error) {
        const errorMessage = error?.details
            ?.map((detail) => detail?.message)
            .join(", ");

        return res.status(400).json({
            code: 1,
            msg: errorMessage,
        });
    }
    Object.assign(req, value);
    return next();
};

module.exports = validate;