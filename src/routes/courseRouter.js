const express = require('express')
const { createCourseHandler, getAllCourseHandler, updateCourseHandler, deleteCourseHandler } = require('../controllers/courseController')
const routerCourse = express.Router()


routerCourse.get('/', getAllCourseHandler)
routerCourse.post('/create', createCourseHandler)
routerCourse.put('/update/:id', updateCourseHandler)
routerCourse.delete('/delete/:id', deleteCourseHandler)


module.exports = routerCourse