const sql = require('mssql')
const connectionPool = require('../config/database')

function createCourse(data) {
    const columns = ['id', 'name', 'price', 'description']
    const { idCourse, nameCourse, priceCourse, descriptionCourse } = data
    connectionPool
        .then(pool => {
            return pool.request()
                .input('id', sql.TYPES.VarChar, idCourse)
                .input('name', sql.TYPES.NVarChar, nameCourse)
                .input('price', sql.TYPES.Float, priceCourse)
                .input('description', sql.TYPES.NVarChar, descriptionCourse)
                .query(`INSERT INTO COURSES (${columns}) VALUES (@id, @name, @price, @description)`)
        })
}

function getCourse(idCourse) {
    return connectionPool
        .then(pool => {
            return pool.request()
            .input('idCourse', sql.TYPES.VarChar, idCourse)
            .query(`SELECT * FROM COURSES WHERE ID = @idCourse`) 
        })
        .then(course => {
            return course.recordset[0]
        })
}

function getAllCourses() {
    return connectionPool
        .then(pool => {
            return pool.request().query(`SELECT * FROM COURSES`)
        })
        .then(courses => {
            return courses.recordset
        })
}

function updateCourse(data) {
    const columns = ['id', 'name', 'price', 'description']
    const { idCourse, nameCourse, priceCourse, descriptionCourse } = data
    return connectionPool
        .then(pool => {
            return pool.request()
                .input('id', sql.TYPES.VarChar, idCourse)
                .input('name', sql.TYPES.NVarChar, nameCourse)
                .input('price', sql.TYPES.Float, priceCourse)
                .input('description', sql.TYPES.NVarChar, descriptionCourse)
                .query(`UPDATE COURSES SET ${columns[1]} = @name, ${columns[2]} = @price, ${columns[3]} = @description WHERE ${columns[0]} = @id`)
        })
}

function deleteCourse(idCourse) {
    return connectionPool
        .then(pool => {
            return pool.request()
                .input('idCourse', sql.TYPES.VarChar, idCourse)
                .query(`DELETE Courses WHERE id = @idCourse`)
        })
}

module.exports = {
    createCourse,
    getCourse,
    getAllCourses,
    updateCourse,
    deleteCourse
}