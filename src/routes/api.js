const express = require('express')
const authentication = require('../middleware/authentication')
const routerAPI = express.Router()
const routerCourse = require('../routes/courseRouter')
const userRouter = require('../routes/userRouter')

routerAPI.all('*', authentication);
routerAPI.use('/courses', routerCourse)
routerAPI.use('/users', userRouter)


module.exports = routerAPI