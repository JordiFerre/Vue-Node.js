const Joi = require('joi')
const JoiMongoDB = require('joi-oid')

module.exports.createPromptSchema = Joi.object({
    title: Joi.string().required(),
    prompt: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).min(0).max(4).required(),
    private: Joi.boolean().required(),
    owner: Joi.string().required()
})

module.exports.promptIdSchema = Joi.object({
    id: JoiMongoDB.objectId().required()
})

module.exports.promptSearchSchema = Joi.object({
    title: Joi.string().optional(),
    prompt: Joi.string().optional(),
    tags: Joi.array().items(Joi.string()).min(0).max(4).optional(),
    private: Joi.boolean().optional(),
    owner: Joi.string().optional(),
    skip: Joi.number().integer().optional(),
    limit: Joi.number().integer().optional()
}).and('skip', 'limit')

module.exports.updatePromptSchema = Joi.object({
    title: Joi.string().optional(),
    prompt: Joi.string().optional(),
    tags: Joi.array().items(Joi.string()).min(0).max(4).optional(),
    private: Joi.boolean().optional()
})
