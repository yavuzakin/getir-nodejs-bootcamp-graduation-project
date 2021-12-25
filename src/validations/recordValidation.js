const Joi = require('joi')
    .extend(require('@joi/date'));

const recordPost = Joi.object({
    startDate: Joi.date().format('YYYY-MM-DD').required(),
    endDate: Joi.date().format('YYYY-MM-DD').required(),
    minCount: Joi.number().positive().required(),
    maxCount: Joi.number().positive().required(),
})

module.exports = {
    recordPost,
}