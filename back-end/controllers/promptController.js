const promptService = require('../services/promptService')

module.exports.create = async (req, res) => {
    const responseObj = { status: 500, message: 'Internal server error.' }
    try {
        const responseFromService = await promptService.create(req.body)
        if (responseFromService.status) {
            responseObj.body = responseFromService.result
            responseObj.message = 'Prompt created successfully.'
            responseObj.status = 201
        } else responseObj.error = responseFromService.error
    } catch (error) {
        responseObj.error = error
        console.log(`CONTROLLER ERROR! ${error}.`)
    }
    return res.status(responseObj.status).send(responseObj)
}

module.exports.findById = async (req, res) => {
    const responseObj = { status: 500, message: 'Internal server error.' }
    try {
        const responseFromService = await promptService.findById(req.params.id)
        if (responseFromService.status) {
            if (responseFromService.result) {
                responseObj.body = responseFromService.result
                responseObj.message = 'Prompt fetched successfully.'
                responseObj.status = 200
            } else {
                responseObj.message = 'Prompt not found.'
                responseObj.status = 404
            }
        } else responseObj.error = responseFromService.error
    } catch (error) {
        responseObj.error = error
        console.log(`CONTROLLER ERROR! ${error}.`)
    }
    return res.status(responseObj.status).send(responseObj)
}

module.exports.findQuery = async (req, res) => {
    const responseObj = { status: 500, message: 'Internal server error.' }
    try {
        const responseFromService = await promptService.findQuery(req.query, {
            skip: parseInt(req.query.skip),
            limit: parseInt(req.query.limit)
        })
        if (responseFromService.status) {
            if (responseFromService.result) {
                responseObj.body = responseFromService.result;
                responseObj.message = 'Prompts fetched successfully.'
                responseObj.status = 200
            } else {
                responseObj.message = 'No prompts found.'
                responseObj.status = 404
            }
        } else responseObj.error = responseFromService.error
    } catch (error) {
        responseObj.error = error
        console.log(`CONTROLLER ERROR! ${error}.`)
    }
    return res.status(responseObj.status).send(responseObj)
}

module.exports.update = async (req, res) => {
    const responseObj = { status: 500, message: 'Internal server error.' }
    try {
        req.body.id = req.params.id
        const responseFromService = await promptService.update(req.body)
        if (responseFromService.status) {
            if (responseFromService.result) {
                responseObj.body = responseFromService.result
                responseObj.message = 'Prompt updated successfully.'
                responseObj.status = 200
            } else {
                responseObj.message = 'Prompt not found.'
                responseObj.status = 404
            }
        } else responseObj.error = responseFromService.error
    } catch (error) {
        responseObj.error = error
        console.log(`CONTROLLER ERROR! ${error}.`)
    }
    return res.status(responseObj.status).send(responseObj)
}

module.exports.delete = async (req, res) => {
    const responseObj = { status: 500, message: 'Internal server error.' }
    try {
        const responseFromService = await promptService.delete(req.params.id)
        if (responseFromService.status) {
            if (responseFromService.result) {
                responseObj.body = responseFromService.result
                responseObj.message = 'Prompt erased successfully.'
                responseObj.status = 200
            } else {
                responseObj.message = 'Prompt not found.'
                responseObj.status = 404
            }
        } else responseObj.error = responseFromService.error
    } catch (error) {
        responseObj.error = error
        console.log(`CONTROLLER ERROR! ${error}.`)
    }
    return res.status(responseObj.status).send(responseObj)
}
