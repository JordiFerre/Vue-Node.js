const mongoose = require('mongoose')
const Prompt = require('../models/db/promptModel')
const { executeCRUD } = require('../database/crudRepository')

module.exports.create = async (promptInstanceData) => {
    const responseObj = { status: false }
    try {
        const responseFromRepository = await executeCRUD(new Prompt(promptInstanceData), 'create')
        if (responseFromRepository.status) {
            responseObj.result = responseFromRepository.result
            responseObj.status = true
        } else responseObj.error = responseFromRepository.error
    } catch (error) {
        responseObj.error = error
        console.log(`SERVICE ERROR! ${error}.`)
    }
    return responseObj
}

module.exports.findById = async (promptId) => {
    const responseObj = { status: false }
    try {
        const responseFromRepository = await executeCRUD({
            _id: new mongoose.Types.ObjectId(promptId),
            model: Prompt,
            projection: { __v: false }
        }, 'readById')
        if (responseFromRepository.status) {
            responseObj.result = responseFromRepository.result
            responseObj.status = true
        } else responseObj.error = responseFromRepository.error
    } catch (error) {
        responseObj.error = error
        console.log(`SERVICE ERROR! ${error}.`)
    }
    return responseObj
}

module.exports.findQuery = async (promptQuery, pagination) => {
    const responseObj = { status: false }
    try {
        const responseFromRepository = await executeCRUD({
            findQuery: promptQuery,
            skip: pagination.skip,
            limit: pagination.limit,
            model: Prompt,
            projection: { __v: false }
        }, 'read')
        if (responseFromRepository.status) {
            responseObj.result = responseFromRepository.result
            responseObj.status = true
        } else responseObj.error = responseFromRepository.error
    } catch (error) {
        responseObj.error = error
        console.log(`SERVICE ERROR! ${error}.`)
    }
    return responseObj
}

module.exports.update = async (promptInstanceData) => {
    const responseObj = { status: false }
    try {
        const responseFromRepository = await executeCRUD({
            _id: new mongoose.Types.ObjectId(promptInstanceData.id),
            updateQuery: promptInstanceData,
            model: Prompt,
            projection: { __v: false }
        }, 'update')
        if (responseFromRepository.status) {
            responseObj.result = responseFromRepository.result
            responseObj.status = true
        } else responseObj.error = responseFromRepository.error
    } catch (error) {
        responseObj.error = error
        console.log(`SERVICE ERROR! ${error}.`)
    }
    return responseObj
}

module.exports.delete = async (promptId) => {
    const responseObj = { status: false }
    try {
        const responseFromRepository = await executeCRUD({
            _id: new mongoose.Types.ObjectId(promptId),
            model: Prompt,
            projection: { __v: false }
        }, 'delete')
        if (responseFromRepository.status) {
            responseObj.result = responseFromRepository.result
            responseObj.status = true
        } else responseObj.error = responseFromRepository.error
    } catch (error) {
        responseObj.error = error
        console.log(`SERVICE ERROR! ${error}.`)
    }
    return responseObj
}
