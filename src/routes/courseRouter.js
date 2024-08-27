const express = require('express')
const { createCourseHandler, getAllCourseHandler } = require('../controllers/courseController')
const routerCourse = express.Router()


routerCourse.get('/', getAllCourseHandler)
routerCourse.post('/create', createCourseHandler)


module.exports = routerCourse