const Joi = require('joi')
    .extend(require('@joi/date'));

const recordPost = Joi.object({
    startDate: Joi.date().format('YYYY-MM-DD').required(),
    endDate: Joi.date().format('YYYY-MM-DD').required(),
    minCount: Joi.number().required(),
    maxCount: Joi.number().required(),
})

module.exports = {
    recordPost,
}