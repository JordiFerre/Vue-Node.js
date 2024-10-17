const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true }
}, {
    timestamps: true
})

module.exports = mongoose.connection.useDb(process.env.DB_NAME).model('User', usersSchema)
