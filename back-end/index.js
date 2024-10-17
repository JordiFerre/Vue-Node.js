const express = require('express')
const app = express()
const cors = require('cors')
const connect = require('./database/connect')
require('dotenv').config()

connect.createConnection()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/api/v1/prompt', require('./routes/promptRoutes'))
app.use('/api/v1/auth', require('./routes/authRoutes'))

app.listen(process.env.PORT, function() {
    console.log(`Listening to port ${process.env.PORT}.`)
})
