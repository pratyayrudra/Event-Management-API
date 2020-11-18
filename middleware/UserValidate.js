const Joi = require('@hapi/joi');

const UserSchema = Joi.object({
    name: Joi.string().max(50).required(),
    email: Joi.string().email().required()
})

module.exports = (user) => {
    return UserSchema.validate(user)
}