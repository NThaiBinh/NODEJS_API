const { createCourse, getCourse, getAllCourses, updateCourse, deleteCourse } = require('../services/coursesServices')

async function createCourseHandler(req, res) {
    const { name, price, description } = req.body
    if(name && price && description) {
        try {
            await createCourse(req.body)
            return res.status(201).json(req.body)
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
        return res.status(200).json(courses)
    }
    catch(err) {
        return res.status(500).json({
            message: 'Error'
        })
    }
}

async function updateCourseHandler(req, res) {
    const {name, price, description } = req.body
    if(name && price && description) {
        try {
            await updateCourse(req.body)
            return res.status(200).json(req.body)
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