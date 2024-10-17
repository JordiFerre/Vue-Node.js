const express = require('express')
const router = express.Router()
const joiSchemaHandler = require('../middlewares/joiSchemaHandler')
const joiObject = require('../models/joi/authSchema')
const authController = require('../controllers/authController')

router.post('/register',
    joiSchemaHandler.validate(joiObject.registerUserSchema, 'body'),
    authController.register)
router.post('/login',
    joiSchemaHandler.validate(joiObject.loginUserSchema, 'body'),
    authController.login)

module.exports = router
