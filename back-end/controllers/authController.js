const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authService = require('../services/authService')

module.exports.register = async (req, res) => {
    const responseObj = { status: 500, message: 'Internal server error.' }
    try {
        const responseFromService = await authService.register({
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, parseInt(process.env.SALT_WORK_FACTOR)),
            name: req.body.name,
            lastName: req.body.lastName
        })
        if (responseFromService.status) {
            responseObj.body = responseFromService.result
            responseObj.token = jwt.sign(
                { user: responseFromService.result.email },
                process.env.SECRET_KEY,
                { expiresIn: '4h' })
            responseObj.message = 'User created successfully.'
            responseObj.status = 201
        } else responseObj.error = responseFromService.error
    } catch (error) {
        responseObj.error = error
        console.log(`CONTROLLER ERROR! ${error}.`)
    }
    return res.status(responseObj.status).send(responseObj)
}

module.exports.login = async function(req, res) {
    const responseObj = { status: 500, message: 'Internal server error.' }
    try {
        const responseFromService = await authService.login({ email: req.body.email })
        if (responseFromService.status) {
            const user = responseFromService.result[0]
            if (user && await bcrypt.compare(req.body.password, user.password)) {
                responseObj.body = responseFromService.result
                responseObj.token = jwt.sign(
                    { user: responseFromService.result.email },
                    process.env.SECRET_KEY,
                    { expiresIn: '4h' })
                responseObj.message = 'User authenticated successfully.'
                responseObj.status = 200
            } else {
                responseObj.message = 'Invalid credentials.'
                responseObj.status = 400
            }
        } else responseObj.error = responseFromService.error
    } catch (error) {
        responseObj.error = error
        console.log(`CONTROLLER ERROR! ${error}.`)
    }
    return res.status(responseObj.status).send(responseObj)
}
