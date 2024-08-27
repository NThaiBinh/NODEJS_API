const { createCourse, getCourse, getAllCourses } = require('../services/coursesServices')

async function createCourseHandler(req, res) {
    const { idCourse, nameCourse, priceCourse, descriptionCourse } = req.body
    const courseExits = await getCourse(idCourse)
    console.log(courseExits)
    if(courseExits) {
        return res.status(200).json({
            message: 'Course is exits'
        })
    }
    if(idCourse && nameCourse && priceCourse && descriptionCourse) {
        await createCourse(req.body)
        return res.status(200).json({
            message: 'Create success',
            data: req.body
        })
    }
    else {
        return res.status(200).json({
            message: 'missing data'
        })
    }
}

async function getAllCourseHandler(req, res) {
    const courses = await getAllCourses();
    return res.status(200).json({
        message: 'ok',
        data: courses
    })
}

module.exports = {
    createCourseHandler,
    getAllCourseHandler
}