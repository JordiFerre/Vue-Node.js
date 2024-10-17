const mongoose = require('mongoose')

module.exports.createConnection = () => {
    try {
        console.log('DB connecting...')
        mongoose.connect(process.env.DB_URL)
        const db = mongoose.connection
        db.once('open', () => {
            console.log('DB connected successfully.')
        })
        db.on('error', (error) => {
            console.log(`DB connection lost! ${error}.`)
        })
    } catch (error) {
        console.log(`DB connection error! ${error}.`)
    }
}
