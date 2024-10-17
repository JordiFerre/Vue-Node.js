const express = require('express')
const router = express.Router()
const tokenHandler = require('../middlewares/tokenHandler')
const joiSchemaHandler = require('../middlewares/joiSchemaHandler')
const joiObject = require('../models/joi/promptSchema')
const promptController = require('../controllers/promptController')

router.post('/create',
    tokenHandler.validate(),
    joiSchemaHandler.validate(joiObject.createPromptSchema, 'body'),
    promptController.create)
router.get('/get/:id',
    tokenHandler.validate(),
    joiSchemaHandler.validate(joiObject.promptIdSchema, 'path'),
    promptController.findById)
router.get('/list',
    tokenHandler.validate(),
    joiSchemaHandler.validate(joiObject.promptSearchSchema, 'query'),
    promptController.findQuery)
router.put('/update/:id',
    tokenHandler.validate(),
    joiSchemaHandler.validate(joiObject.promptIdSchema, 'path'),
    joiSchemaHandler.validate(joiObject.updatePromptSchema, 'body'),
    promptController.update)
router.delete('/delete/:id',
    tokenHandler.validate(),
    joiSchemaHandler.validate(joiObject.promptIdSchema, 'path'),
    promptController.delete)

module.exports = router
