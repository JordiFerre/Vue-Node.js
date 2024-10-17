const Joi = require('joi')

module.exports.registerUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(new RegExp(/^[a-zA-Z]\w{5,15}$/)).required(),
    name: Joi.string().min(2).max(10).required(),
    lastName: Joi.string().min(2).max(10).required()
})

module.exports.loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(new RegExp(/^[a-zA-Z]\w{5,15}$/)).required()
})
