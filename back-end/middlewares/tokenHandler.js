const jwt = require('jsonwebtoken')

module.exports.validate = () => {
    return (req, res, next) => {
        const responseObj = { status: 400 }
        const authHeader = req.headers.authorization
        if (authHeader && authHeader.split(' ')[0] === 'Bearer' && authHeader.split(' ')[1]) {
            try {
                req.token = jwt.verify(authHeader.split(' ')[1], process.env.SECRET_KEY)
                next()
            } catch (error) {
                responseObj.message = 'Invalid token.'
                console.log(`VALIDATION ERROR! ${error}.`)
                return res.status(responseObj.status).send(responseObj)
            }
        } else {
            responseObj.message = 'Bearer token missing from header.'
            return res.status(responseObj.status).send(responseObj)
        }
    }
}
