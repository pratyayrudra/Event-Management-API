const Joi = require('@hapi/joi');

const EventSchema = Joi.object({
    title: Joi.string().max(100).required(),
    description: Joi.string().max(5000).required(),
    image: Joi.string().uri(),
    date: Joi.date().required(),
    location: Joi.string().required(),
    allowed_attendees: Joi.number().integer().required(),
    waitlist: Joi.number().integer(),
    startTime: Joi.date().optional(),
    endTime: Joi.date().optional()
})

module.exports = (event) => {
    return EventSchema.validate(event)
}