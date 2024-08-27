require('dotenv').config()
const express = require('express')
const app = express()
const { configServer } = require('./config/serverConfig')
const routerAPI = require('./routes/api')


const host = process.env.SERVER_HOST
const port = process.env.SERVER_PORT || 4000

//config server
configServer(app)

//route api
app.use('/api/v1', routerAPI)

app.listen(port, host, () => {
    console.log(`Server running at: http://${host}:${port}`)
  })