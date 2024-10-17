const User = require('../models/db/userModel')
const { executeCRUD } = require('../database/crudRepository')

module.exports.register = async (userInstanceData) => {
    const responseObj = { status: false }
    try {
        const responseFromRepository = await executeCRUD(new User(userInstanceData), 'create')
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

module.exports.login = async (email) => {
    const responseObj = { status: false }
    try {
        const responseFromRepository = await executeCRUD({
            findQuery: email,
            model: User,
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
