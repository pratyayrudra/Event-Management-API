const Joi = require('@hapi/joi');

const AttendSchema = Joi.object({
    userID: Joi.number().integer().required(),
    eventID: Joi.number().integer().required(),
    email: Joi.string().email().required(),
})

module.exports = (attend) => {
    return AttendSchema.validate(attend)
}