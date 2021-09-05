const Joi = require('@hapi/joi')

const  valClientSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email().lowercase(),
    message: Joi.string().required(),
    token: Joi.string().required()
})

module.exports = {
    valClientSchema,
}