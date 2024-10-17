require('joi')

module.exports.validate = (schema, dataFrom) => {
    return (req, res, next) => {
        let objToValidate = {}
        if (dataFrom === 'body') objToValidate = req.body
        else if (dataFrom === 'query') objToValidate = req.query
        else if (dataFrom === 'path') objToValidate = req.params

        const result = schema.validate(objToValidate)

        if (result.error) {
            const errorDetails = result.error.details.map((value) => value.message)
            const responseObj = { status: 400, body: errorDetails }
            return res.status(responseObj.status).send(responseObj)
        } else next()
    }
}
