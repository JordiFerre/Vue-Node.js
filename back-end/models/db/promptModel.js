const mongoose = require('mongoose')

const promptsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    prompt: { type: String, required: true },
    tags: { type: [String], required: true },
    private: { type: Boolean, required: true },
    owner: { type: String, required: true }
}, {
    timestamps: true
})

module.exports = mongoose.connection.useDb(process.env.DB_NAME).model('Prompt', promptsSchema)
