const express = require('express')
const auth = require('../middleware/auth')
const routerAPI = express.Router()
const routerCourse = require('../routes/courseRouter')
const userRouter = require('../routes/userRouter')

routerAPI.all('*', auth);
routerAPI.use('/course', routerCourse)
routerAPI.use('/user', userRouter)


module.exports = routerAPI