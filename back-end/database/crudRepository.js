module.exports.executeCRUD = async (data, operation) => {
    const responseObj = { status: false }
    try {
        if (operation === 'create') responseObj.result = await data.save()
        else if (operation === 'readById') responseObj.result = await data.model.findById(data._id, data.projection)
        else if (operation === 'read') responseObj.result = await data.model.find(
            data.findQuery, data.projection).skip(data.skip).limit(data.limit)
        else if (operation === 'update') responseObj.result = await data.model.findByIdAndUpdate(
            data._id, data.updateQuery, { projection: data.projection, new: true, useFindAndModify: false })
        else if (operation === 'delete') responseObj.result = await data.model.findByIdAndDelete(
            data._id, data.projection)
        responseObj.status = true
    } catch (error) {
        responseObj.error = error
        console.log(`CRUD ERROR! ${error}.`)
    }
    return responseObj
}
