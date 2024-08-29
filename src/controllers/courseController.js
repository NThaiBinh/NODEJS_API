const { createCourse, getCourse, getAllCourses, updateCourse, deleteCourse } = require('../services/coursesServices')

async function createCourseHandler(req, res) {
    const { idCourse, nameCourse, priceCourse, descriptionCourse } = req.body
    if(idCourse && nameCourse && priceCourse && descriptionCourse) {
        try {
            const courseExits = await getCourse(idCourse)
            if(courseExits) {
                return res.status(200).json({
                    message: 'Course already exits'
                })
            }
            await createCourse(req.body)
            return res.status(201).json({
                message: 'Create success',
                data: req.body
            })
        }
        catch(err) {
            return res.status(200).json({
                message: 'Error'
            })
        }
    }
    else {
        return res.status(200).json({
            message: 'missing data'
        })
    }
}

async function getAllCourseHandler(req, res) {
    try {
        const courses = await getAllCourses();
        return res.status(200).json({
            message: 'ok',
            data: courses
        })
    }
    catch(err) {
        return res.status(200).json({
            message: 'Error'
        })
    }
}

async function updateCourseHandler(req, res) {
    const { idCourse, nameCourse, priceCourse, descriptionCourse } = req.body
    if(idCourse && nameCourse && priceCourse && descriptionCourse) {
        try {
            await updateCourse(req.body)
            return res.status(200).json({
                message: 'Update success',
                data: req.body
            })
        }
        catch(err) {
            return res.status(200).json({
                message: 'Error',
                error: err
            })
        }
    }
    else {
        return res.status(200).json({
            message: 'missing data'
        })
    }
}

async function deleteCourseHandler(req, res) {
    try {
        await deleteCourse(req.params.id)
        res.status(200).json({
            message: 'Delete success'
        })
    }
    catch(err) {
        return res.status(200).json({
            message: 'Error',
            error: err
        })
    }
}

module.exports = {
    createCourseHandler,
    getAllCourseHandler,
    updateCourseHandler,
    deleteCourseHandler
}